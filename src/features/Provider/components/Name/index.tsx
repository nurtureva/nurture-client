import samplePhoto1 from '@/assets/profile-1.png';
import samplePhoto2 from '@/assets/profile-2.png';
import { ProviderObject } from '@/types';
import Contact from '../Contact';

export default function Name({
  provider,
  children
}: {
  provider: ProviderObject;
  children?: React.ReactNode;
}) {
  const {
    profile_photo,
    name,
    business_name: businessName,
    services,
    certifications,
    paymentOptions
  } = provider;
  const photoList = [samplePhoto1, samplePhoto2];
  const photoSrc = profile_photo
    ? import.meta.env.VITE_S3_URL + profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  return (
    <>
      <img src={photoSrc} />
      <span className="provider-name">
        <h3>{name}</h3>
        <p>{businessName}</p>
      </span>
      <span className="provider-details">
        {services?.length ? (
          <p>
            Type of care:
            {services?.map((service, index) => {
              const comma = index !== services.length - 1 ? ',' : '';
              return ` ${service.name}${comma}`;
            })}
          </p>
        ) : (
          ''
        )}
        {certifications?.length ? (
          <p>
            Certifications:
            {certifications?.map((service, index) => {
              const comma = index !== certifications.length - 1 ? ',' : '';
              return ` ${service.name}${comma}`;
            })}
          </p>
        ) : (
          ''
        )}
        {paymentOptions?.length ? (
          <p>
            Payment:
            {paymentOptions?.map((service, index) => {
              const comma = index !== paymentOptions.length - 1 ? ',' : '';
              return ` ${service.name}${comma}`;
            })}
          </p>
        ) : (
          ''
        )}
        {children}
      </span>
      <Contact provider={provider} />
    </>
  );
}
