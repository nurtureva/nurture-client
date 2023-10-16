import { PictureSplitContainer } from '.';
import { ButtonGroup } from '..';

interface TypeOfCareProps extends React.PropsWithChildren {
  picture: string;
  title: string;
  id: number;
  isRegularPostioning?: boolean;
}

const depluralize = (string: string) => {
  let newString = string.toLowerCase();
  if (string[string.length - 1] === 's') {
    newString = newString.slice(0, -1);

    return 'a ' + newString;
  }
  return newString;
};

export const TypeOfCare = ({
  picture,
  title,
  children,
  isRegularPostioning = true
}: TypeOfCareProps) => {
  return (
    <PictureSplitContainer
      reverse={!isRegularPostioning}
      picture={picture}
      backgroundColor="tan">
      <h3>{title}</h3>
      <p>{children}</p>
      <ButtonGroup
        converse
        buttonProps={[
          {
            children: `Find ${depluralize(title)}`,
            // state: { filters: { services: [id] } },
            to: '/results'
          },
          {
            children: 'Learn More',
            to: '/'
          }
        ]}
      />
    </PictureSplitContainer>
  );
};
