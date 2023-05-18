import { Link } from 'react-router-dom';

const title = 'Care Provider Home';
const Header = () => {
  return (
    <>
      <span>
        <h2>Join the Birth and Early Parenting Resource Directory!</h2>
        <p>
          List your practice in this directory for free! Help new and expecting
          parents find and hire you.
        </p>
        <Link className="link-button" to="/provider-form">
          List your practice
        </Link>
        <button className="link-button">Update your listing</button>
      </span>
      <span>
        <img></img>
      </span>
    </>
  );
};

const Content = () => {
  return (
    <>
      <h3>About the Birth and Early Parenting Resource Directory</h3>
      <p>
        Paragraph describing what we want practitioners to know about this
        project, why we want them here, etc. Explain collecting data for
        research. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
        Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor
        enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
        voluptate aute id deserunt nisi.
      </p>
    </>
  );
};

const careProviderContent = { title, Header, Content };
export default careProviderContent;
