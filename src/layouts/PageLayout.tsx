import { ContentObject } from '../types';

const PageLayout: React.FC<ContentObject> = (props) => {
  const { title, Header, Content, className } = props;
  return (
    <div className={`content-wrapper${className ? ' ' + className : ''}`}>
      {title ? <h1>{title}</h1> : ''}
      {Content ? (
        <div className="content-main">
          <Content {...props} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PageLayout;
