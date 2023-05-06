import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Dashboard.scss';

export default function Dashboard() {
  const OptionCenter = ({ img, title, path, className, children }) => {
    return (
      <div>
        <span>
          <img src={img} />
        </span>
        <h4>{title}</h4>
        <span>
          {children}
          <Link to={path}>learn more</Link>
        </span>
      </div>
    );
  };
  return (
    <content className="dashboard">
      <h1>Birth and Early Parenting Resource Directory</h1>
      <div className="content-header">
        <span>
          <h2>Welcome to community-centered care for all</h2>
          <p>
            One or two sentences explaining what this directory is and why it
            exists.
          </p>
          <Link className="link-button" to="/find-care">
            Find Care
          </Link>
          <Link className="link-button">I'm a Care Provider</Link>
        </span>
        <span>
          <img></img>
        </span>
      </div>
      <div className="dashboard-main">
        <h3>What you'll find here</h3>
        <div className="category-links">
          <OptionCenter title="Doulas" img={logo} path="/">
            <p>
              Trained professionals offering support to expectant parents
              throughout pregnancy, childbirth, and after childbirth. They
              provide non-medical support such as education, advocacy, and
              emotional and physical comfort measures to help the birthing
              person and their partner have a positive birth experience.
            </p>
          </OptionCenter>
          <OptionCenter title="Lactation Support" img={logo} path="/">
            <p>
              Guidance, education, and assistance to help
              breastfeeding/chestfeeding parents overcome challenges and ensure
              the health and well-being of both the parent and baby. This
              support can include advice, emotional support, one-on-one
              assistance, and more.
            </p>
          </OptionCenter>
          <OptionCenter title="Mental Health Services" img={logo} path="/">
            <p>
              Support for emotional well-being during the perinatal period
              (pregnancy and the first year after childbirth). These care
              providers address mental health concerns that may arise during
              this time such as depression and anxiety, and can support the
              transition to parenthood and the development of healthy
              parent-child relationships.
            </p>
          </OptionCenter>
        </div>
      </div>
    </content>
  );
}
