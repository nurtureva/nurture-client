import { useLoaderData, useNavigate } from 'react-router-dom';
import { OrganizationObject, ProviderObject } from '@/types';
import samplePhoto1 from '@/assets/images/profile-1.png';
import sampleProfilePhoto from '@/assets/images/about-hero.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import sampleLogo from '@/assets/images/sample-logo-1.png';
import { Bookmark } from '../components/Bookmark';
import { Button, Icon } from '@/components';
import { Address } from '../components/Address';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { addHash } from '@/features/ProviderForm/utils/api';
import { Modal } from '../../../components/Modal';
import { useRef, useState, useEffect } from 'react';

export default function ProviderPage() {
  const { provider: individualProvider, organization } = useLoaderData() as {
    provider: ProviderObject;
    organization: OrganizationObject;
  };
  const navigate = useNavigate();
  const provider = individualProvider || organization;
  const photoList = [samplePhoto1, samplePhoto2];
  const firstName = provider.name.split(' ')[0];
  const photoSrc = provider.profile_photo
    ? import.meta.env.VITE_S3_URL + provider.profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  const textRef = useRef<HTMLTextAreaElement>(null);
  const countRef = useRef<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textRef.current) {
      const length = textRef.current.value.length;
      const lengthDisplay = document.getElementById('lengthDisplay');
      if (lengthDisplay) {
        lengthDisplay.textContent = `${length}/500`;
        lengthDisplay.className = length > 500 ? 'text-red' : 'text-grey';
      }
    }
  };
  const requestEditHandler = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
    if (textRef.current) {
      textRef.current.value = '';
    }
  };
  const submitHandler = () => {
    if (textRef.current) {
      addHash(provider.id, textRef.current.value);
      setIsSubmitted(true);
    }
  };

  const formatNames = (items: any[]) => {
    if (!items || items.length === 0) {
      return '';
    }

    return items.reduce((currentString, item, index) => {
      const name = item.name;
      return index === items.length - 1
        ? currentString + name
        : currentString + name + ', ';
    }, '');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const formattedPayments = formatNames(provider.paymentOptions!);
  const formattedCertifications = formatNames(provider.certifications!);
  const formattedServices = formatNames(provider.services!);

  return (
    <div className="provider-container full">
      {isModalOpen && (
        <Modal
          title="Request an Edit"
          size="small"
          closeHandler={() => setIsModalOpen(false)}>
          {!isSubmitted ? (
            <>
              <p>
                See something incorrect? Requesting an edit will prompt the
                practitioner to update their information. Please use the text
                box below to briefly describe what needs editing.
              </p>
              <section className="popup-text-container">
                <p>Edit/update needed:</p>
                <p
                  id="lengthDisplay"
                  className={`${
                    countRef.current || 0 > 500 ? 'text-red' : 'text-grey'
                  }`}>
                  {countRef.current}/500
                </p>
              </section>
              <textarea
                className="modal-textarea"
                ref={textRef}
                onChange={handleChange}
                rows="10"
                cols="30"
              />
              <section className="button-container">
                <button
                  className="button secondary"
                  onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className={`button primary`} onClick={submitHandler}>
                  Request Edit
                </button>
              </section>
            </>
          ) : (
            <>
              <p>Thank you! Your request has been submitted.</p>
              <section className="button-container">
                <button
                  className="button secondary"
                  onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </section>
            </>
          )}
        </Modal>
      )}
      <div className="provider-actions">
        <span>
          <Icon type="arrow_back" />
          <a
            onClick={() => {
              navigate(-1);
            }}>
            back
          </a>
        </span>
      </div>
      <div className="provider-header">
        <span className="provider-container"></span>
        <div className="provider-image">
          <div className="circle">
            <Bookmark provider={provider} />
            <img
              src={
                provider.profile_photo ? provider.profile_photo : provider.logo
              }
              className="photo"
            />
            {provider.logo && provider.profile_photo ? (
              <div className="circle">
                <img className="org-photo" src={provider.logo}></img>
              </div>
            ) : null}
          </div>
        </div>
        <section className="information-container">
          <span>
            <h2>{provider.name}</h2>
            <p>{provider.business_name}</p>
            <p>Type of care: {formattedServices}</p>
            <Address provider={provider} />
          </span>
          <span>
            {provider.phone && <p>Phone number: {provider.phone}</p>}
            {provider.email && (
              <p>
                Email: <a href={`mailto:${provider.email}`}>{provider.email}</a>
              </p>
            )}
            {provider.website ? (
              <p>
                Website:{' '}
                <a
                  href={
                    provider.website.startsWith('http://') ||
                    provider.website.startsWith('https://')
                      ? provider.website
                      : `https://www.${provider.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer">
                  {provider.website}
                </a>
              </p>
            ) : null}
          </span>
        </section>
      </div>
      <div className="provider-body">
        <h3>About {firstName}</h3>
        {provider.overview ? (
          <>
            <h4>Overview of service:</h4>
            <p>{provider.overview}</p>
          </>
        ) : null}
        {provider.bio ? (
          <>
            <h4>Personal Bio:</h4>
            <p>{provider.bio}</p>
          </>
        ) : null}
        <p>{provider.role}</p>
        <h3>Professional Details</h3>
        <p>
          <span>Payment Form Accepted:</span> {formattedPayments}
        </p>
        {provider.certifications ? (
          <p>
            <span>Certifications:</span> {formattedCertifications}
          </p>
        ) : null}

        {provider.languages_spoken || provider.pronouns ? (
          <>
            <h3>Personal Details</h3>
            {provider.languages_spoken && (
              <>
                <p>
                  <span>Languages spoken:</span> {provider.languages_spoken}
                </p>
              </>
            )}
            {provider.pronouns && (
              <>
                <p>
                  <span>Pronouns:</span> {provider.pronouns}
                </p>
              </>
            )}
          </>
        ) : null}

        {/* {provider.pronouns} */}
        {provider.languages_spoken}
        <h3>Contact {firstName}</h3>
        <p>{provider.phone}</p>
        <p>
          <a href={`mailto:${provider.email}`}>{provider.email}</a>
        </p>
        {provider.website && (
          <p>
            <a
              href={
                provider.website.startsWith('http://') ||
                provider.website.startsWith('https://')
                  ? provider.website
                  : `https://www.${provider.website}`
              }
              target="_blank"
              rel="noopener noreferrer">
              {provider.website}
            </a>
          </p>
        )}
      </div>
      {/* <div>
        <Name provider={provider}>
          <p>{provider.overview}</p>
        </Name>
        <div className="option-list-container">
          <span>
            <label>Payment accepted:</label>
            <ul>
              {provider.paymentOptions?.map((payment) => {
                return <li key={payment.id}>{payment.name}</li>;
              })}
            </ul>
          </span>
          <span>
            <label>Certifications:</label>
            <ul>
              {provider.certifications?.map((certification) => {
                return <li key={certification.id}>{certification.name}</li>;
              })}
            </ul>
          </span>
        </div>
        <Contact provider={provider} title={provider.name.split(' ')[0]} />
      </div> */}
      <hr></hr>
      <p className="text-warning">See something incorrect on this page?</p>
      <div className="edit-section">
        <Icon type="edit"></Icon>
        <a
          onClick={requestEditHandler}
          // onClick={(e) => {
          //   const message = prompt(
          //     "Leave a note for the provider so they can fix what's wrong."
          //   );
          //   if (message)
          //     confirmChoice(() => {
          //       addHash(provider.id, message);
          //     }, `send "${message}" to ${provider.name}?`);
          // }}>
        >
          request an edit
        </a>
        <button onClick={scrollToTop}>
          <Icon type="arrow_upward" />
        </button>
      </div>
    </div>
  );
}
