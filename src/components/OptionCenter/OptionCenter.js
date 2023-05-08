import { Link } from 'react-router-dom';

export default function OptionCenter({ img, title, path, children }) {
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
}
