import { Button } from '@/components';
import { ServiceDescriptionSection } from '@/components/PictureSplitContainer';
import { Search } from '@/features/Provider/components/Search';
import doulaImage from '@/assets/images/doula-learn-more.png';
import lactationImage from '@/assets/images/lactation-learn-more.png';
import mentalHealthImage from '@/assets/images/mental-health-learn-more.png';

export const Content = () => {
  const doulaProps = {
    imageSource: doulaImage,
    title: 'Doulas',
    bulletTitle: 'Services doulas may provide include:',
    description:
      'Doulas are professionally trained birth coaches who support and advocate for expecting parents. Many pregnant people, especially those giving birth for the first time, choose to hire a birth doula, who offers prenatal education and emotional support, and advocates for the pregnant parent.',
    srcLink: (
      <a
        href="https://www.dmas.virginia.gov/for-members/for-pregnant-women/"
        target="_blank"
        rel="noopener noreferrer">
        Visit this link to learn more.
      </a>
    ),
    bulletArray: [
      {
        title: 'Birth Doulas',
        description: 'Assist during labor and childbirth.'
      },
      {
        title: 'Postpartum Doulas',
        description: 'Assist after the baby is born.'
      },
      {
        title: 'Antepartum Doulas:',
        description: 'Assists with difficult or high-risk pregnancies.'
      },
      {
        title: 'Full Spectrum Doulas:',
        description:
          'Assists with all stages of reproduction including fertility, pregnancy, loss, abortion, birth, and postpartum.'
      },
      {
        title: 'Community Doulas',
        description: `Assist pregnant and postpartum parents through their grounding within the community, languages, and value systems of the populations they serve. In Virginia, Medicaid may cover the cost of a state-certified community doula.`
      }
    ]
  };
  const lactationProps = {
    imageSource: lactationImage,
    title: 'Lactation Support',
    bulletTitle:
      'There are many types of lactation support providers, with different types of certification, such as:',
    description:
      'Lactation support encompasses a range of services for individuals who are breast or chestfeeding. Lactation support providers are trained professionals who provides information, practical techniques, and emotional support to address issues such as low milk supply, latch difficulties, nipple pain, and infant weight gain concerns.',
    bulletArray: [
      {
        title: 'IBCLCs',
        description:
          'International Board Certified Lactation Consultants go through a rigorous certification program including classes and clinical practice.'
      },
      {
        title: 'CLC',
        description:
          'Certified Lactation Counselors go through a certification process similar to that of an IBCLC, but less rigorous.'
      },
      {
        title: 'Peer Counselors',
        description:
          'Peer Counselors: Individuals who can provide assistance and guidance based on personal experience.'
      },
      {
        title: 'Doulas, Midwives, Nurses',
        description:
          'Many health care professionals have additional training in lactation'
      }
    ]
  };
  const mentalHealthProps = {
    imageSource: mentalHealthImage,
    title: 'Mental Health Care',
    bulletTitle: 'Mental health care can address:',
    description:
      'The terms perinatal and maternal are often used interchangeably. Perinatal mental health refers to mental health during pregnancy and the first postnatal years. This includes mental illness that existed before pregnancy, as well as illnesses that develop for the first time or are exacerbated in the perinatal period.',
    bulletArray: [
      'Prenatal and/or postnatal depression',
      'Prenatal and/or postnatal anxiety',
      'Obsessive compulsive disorder',
      'Postpartum psychosis',
      'Post-traumatic stress disorder (PTSD)'
    ],
    postscript:
      'These illnesses can be mild, moderate or severe, requiring different kinds of care or treatment.'
  };

  // const JumpTo = ({ children }: React.PropsWithChildren<{}>) => {
  //   return (
  //     <p
  //       onClick={(e) => {
  //         console.log(
  //           document.getElementById(
  //             e.currentTarget.innerText.replace(/\s+/g, '-')
  //           ),
  //           e.currentTarget.innerText
  //         );
  //         // document
  //         //   ?.getElementById(e.currentTarget.innerText.replace(/\s+/g, '-'))
  //         //   .scroll(0, 0);
  //       }}>
  //       {children}
  //     </p>
  //   );
  // };
  return (
    <>
      <section className="bg-tan">
        <h1>Learn more</h1>
        <p>
          The Birth and Early Parenting Resource Directory is a listing of
          doulas, lactation support providers, and perinatal mental health care
          providers. Not sure what all of this means? Don’t know what kind of
          care you need? Read more below to get started.
        </p>
        <span className="link-container">
          <ul>
            <li>Jump to:</li>
            <li>
              <a href="#doula">Doulas</a>
            </li>
            <li>
              <a href="#lactation">Lactation Support</a>
            </li>
            <li>
              <a href="#mentalHealth">Mental Health Care</a>
            </li>
          </ul>
          <p>Why these categories?</p>
        </span>
        <div className="tooltip" style={{ display: 'none' }}>
          Why these categories?
        </div>
      </section>
      <section id="doula">
        <ServiceDescriptionSection {...doulaProps} />
      </section>
      <section id="lactation">
        <ServiceDescriptionSection {...lactationProps} />
      </section>
      <section id="mentalHealth">
        <ServiceDescriptionSection {...mentalHealthProps} />
      </section>
      <section className="bg-tan">
        <h2>Why these categories?</h2>
        <p>
          Currently, this directory focuses on three essential categories of
          care: doula, lactation, and perinatal mental health supports. This
          selection is based on our surveys of parents’ core needs during
          pregnancy, birth, and early childhood. As this project grows, we hope
          to expand to add more categories of care. Our goal is for every aspect
          of your journey into parenthood to be met with the guidance and
          expertise you deserve. Read on to learn about our current offerings.
        </p>
        <Button to="https://www.canva.com/design/DAE512OqBZ4/XR-kvBgRHHrQZSs0vrRcOg/view?utm_content=DAE512OqBZ4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">
          Read the full research report
        </Button>
      </section>
      <section className="bg-yellow">
        <h2>Search the directory</h2>
        <Search />
        <p>
          The Birth and Early Parenting Resource Directory will help connect you
          with doulas, lactation consultants, and mental health care
          professionals in the Richmond, Virginia area. Search by entering a
          keyword or the type of care you need, or type in a name if you’re
          looking for a specific practitioner. Enter your zip code to search
          providers near you.
        </p>
      </section>
    </>
  );
};
