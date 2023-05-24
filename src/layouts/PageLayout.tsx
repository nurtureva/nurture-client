import { ContentObject } from '../types';

const PageLayout: React.FC<ContentObject> = (props) => {
  const { title, Header, Content, className, description } = props;
  return (
    <div className={`content-wrapper${className ? ' ' + className : ''}`}>
      {title ? <h1>{title}</h1> : ''}
      {Header ? (
        <div className="content-header">
          <Header />
        </div>
      ) : (
        <p>{description}</p>
      )}
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
