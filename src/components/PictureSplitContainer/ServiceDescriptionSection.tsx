import { PictureSplitContainer } from '.';
import { Button } from '..';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  bulletTitle: string;
  imageSource: string;
  bulletArray: string[] | { title: string; description: string }[];
  postscript?: string;
}

export const ServiceDescriptionSection = ({
  title,
  description,
  bulletTitle,
  imageSource,
  bulletArray,
  postscript
}: ServiceDescriptionProps) => {
  return (
    <section className="service-description-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <PictureSplitContainer picture={imageSource} type="top">
        <ul title={bulletTitle}>
          {bulletArray.map((bulletPoint) => {
            if (typeof bulletPoint === 'string')
              return <li key={bulletPoint}>{bulletPoint}</li>;
            return (
              <li key={bulletPoint.title}>
                <label>{bulletPoint.title}</label>
                {bulletPoint.description}
              </li>
            );
          })}
        </ul>
        {postscript ? <p>{postscript}</p> : ''}
        <Button>Find {title}</Button>
      </PictureSplitContainer>
    </section>
  );
};
