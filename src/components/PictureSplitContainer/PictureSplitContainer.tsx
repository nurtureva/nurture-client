import { PropsWithChildren } from 'react';
//mobile styles
//standard (short height) picture-bottom
//expanded (tall picture) picture-bottom
//top (middling height)   picture-top
export const PictureSplitContainer = ({
  picture,
  backgroundColor,
  reverse,
  type,
  children
}: PropsWithChildren<{
  reverse?: boolean;
  type?: 'full' | 'top';
  picture: string;
  backgroundColor?: 'yellow' | 'green' | 'tan';
}>) => {
  const bgColorClass = backgroundColor ? `bg-${backgroundColor}` : '';
  const pictureContainerStyles: React.CSSProperties = {
    backgroundImage: `url(${picture})`
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
      <span className="picture-container" style={pictureContainerStyles} />
    </section>
  );
};
