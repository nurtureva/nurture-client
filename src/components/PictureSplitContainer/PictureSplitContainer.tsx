import { PropsWithChildren } from 'react';
//mobile styles
//standard (short height) picture-bottom
//expanded (tall picture) picture-bottom
//top (middling height)   picture-top
export const PictureSplitContainer = ({
  picture,
  pictureType,
  backgroundColor,
  reverse,
  type,
  children
}: PropsWithChildren<{
  reverse?: boolean;
  type?: 'full' | 'top';
  picture: string;
  pictureType?: 'icon';
  backgroundColor?: 'yellow' | 'green' | 'tan';
}>) => {
  const bgColorClass = backgroundColor ? `bg-${backgroundColor}` : '';
  const pictureContainerStyles: React.CSSProperties = {
    backgroundImage: `url(${picture})`
  };
  console.log(pictureType);
  const iconPictureStyles: React.CSSProperties = {
    backgroundSize: 'contain',
    backgroundColor: 'var(--off-white)',
    ...pictureContainerStyles
  };
  return (
    <section
      className={`picture-split-container ${bgColorClass} ${
        type === 'full' ? 'full' : ''
      }`}
      style={type === 'top' ? { flexDirection: 'column-reverse' } : {}}>
      <span className={`children-container${reverse ? ' reverse' : ''}`}>
        {children}
      </span>
      <span
        className="picture-container"
        style={
          pictureType !== 'icon' ? pictureContainerStyles : iconPictureStyles
        }
      />
    </section>
  );
};
