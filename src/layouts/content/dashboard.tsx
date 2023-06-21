import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import OptionCenter from '../../components/OptionCenter';

const Header = () => {
  return (
    <>
      <h1>Birth and Early Parenting Resource Directory</h1>
      <p>
        One or two sentences explaining what this directory is and why it
        exists.
      </p>
      <Link className="link-button" to="/find-care">
        Find Care
      </Link>
      <a className="link-button">I'm a Care Provider</a>
    </>
  );
};

const Content = () => {
  return (
    <>
      <h3>What you'll find here</h3>
      <div className="category-links">
        <OptionCenter title="Doulas" img={logo} path="/">
          <p>
            Trained professionals offering support to expectant parents
            throughout pregnancy, childbirth, and after childbirth. They provide
            non-medical support such as education, advocacy, and emotional and
            physical comfort measures to help the birthing person and their
            partner have a positive birth experience.
          </p>
        </OptionCenter>
        <OptionCenter title="Lactation Support" img={logo} path="/">
          <p>
            Guidance, education, and assistance to help
            breastfeeding/chestfeeding parents overcome challenges and ensure
            the health and well-being of both the parent and baby. This support
            can include advice, emotional support, one-on-one assistance, and
            more.
          </p>
        </OptionCenter>
        <OptionCenter title="Mental Health Services" img={logo} path="/">
          <p>
            Support for emotional well-being during the perinatal period
            (pregnancy and the first year after childbirth). These care
            providers address mental health concerns that may arise during this
            time such as depression and anxiety, and can support the transition
            to parenthood and the development of healthy parent-child
            relationships.
          </p>
        </OptionCenter>
      </div>
    </>
  );
};

const dashboardContent = {
  Header,
  Content,
  className: 'dashboard'
};
export default dashboardContent;
