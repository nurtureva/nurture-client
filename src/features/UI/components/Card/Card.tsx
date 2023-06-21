import './card.scss';

export const Card = (
  props: React.PropsWithChildren<{ color?: string; className?: string }>
) => {
  return (
    <div
      className={'card ' + props.className}
      style={{ backgroundColor: `var(${props.color || '--primary-tan'})` }}>
      {props.children}
    </div>
  );
};
