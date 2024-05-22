import { ReactNode } from 'react';
import { PictureSplitContainer } from '.';
import { Button } from '..';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  bulletTitle: string;
  imageSource: string;
  bulletArray: string[] | { title: string; description: string }[];
  postscript?: string;
  srcLink?: ReactNode;
}

export const ServiceDescriptionSection = ({
  title,
  description,
  bulletTitle,
  imageSource,
  bulletArray,
  postscript,
  srcLink
}: ServiceDescriptionProps) => {
  return (
    <section
      id={title.replace(/\s+/g, '-')}
      className="service-description-section">
      <section className="header-section">
        <section>
          <h2>{title}</h2>
          <p>{description}</p>
        </section>
      </section>
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
        {srcLink ? srcLink : ''}
        {postscript ? <p>{postscript}</p> : ''}
        <Button to="/results">Find {title}</Button>
      </PictureSplitContainer>
    </section>
  );
};
