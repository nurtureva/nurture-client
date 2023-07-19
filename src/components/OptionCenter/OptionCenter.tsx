import { Link } from 'react-router-dom';
import doulaImage from '@/assets/images/doula-illustration.svg';
import lactationImage from '@/assets/images/lactation-illustration.svg';
import mentalHealthImage from '@/assets/images/mental-health-illustration.svg';

const OptionCard = ({
  img,
  title,
  id,
  children
}: {
  img: string;
  title: string;
  id: number;
  children: JSX.Element;
}) => {
  const depluralize = (string: string) => {
    let newString = string.toLowerCase();
    if (string[string.length - 1] === 's') {
      newString = newString.slice(0, -1);

      return 'a ' + newString;
    }
    return newString;
  };
  return (
    <div className="option-center">
      <div>
        <span>
          <img src={img} />
        </span>
        <h3>{title}</h3>
        {children}
      </div>
      <Link
        className="text-link"
        state={{ filters: { services: [id] } }}
        to={'/results'}>
        Find {depluralize(title)}
      </Link>
    </div>
  );
};

export const OptionCenter = () => {
  return (
    <div className="option-center-container">
      <OptionCard title="Doulas" img={doulaImage} id={1}>
        <p>
          Trained professionals offering support to expectant parents throughout
          pregnancy, childbirth, and after childbirth. They provide non-medical
          support such as education, advocacy, and emotional and physical
          comfort measures to help the birthing person and their partner have a
          positive birth experience.
        </p>
      </OptionCard>
      <OptionCard title="Lactation Support" img={lactationImage} id={2}>
        <p>
          Guidance, education, and assistance to help breastfeeding/chestfeeding
          parents overcome challenges and ensure the health and well-being of
          both the parent and baby. This support can include advice, emotional
          support, one-on-one assistance, and more.
        </p>
      </OptionCard>
      <OptionCard title="Mental Health Care" img={mentalHealthImage} id={3}>
        <p>
          Support for emotional well-being during the perinatal period
          (pregnancy and the first year after childbirth). These care providers
          address mental health concerns that may arise during this time such as
          depression and anxiety, and can support the transition to parenthood
          and the development of healthy parent-child relationships.
        </p>
      </OptionCard>
    </div>
  );
};
