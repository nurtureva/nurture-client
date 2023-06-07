import { Link } from 'react-router-dom';

const title = 'Page not found';
const Content = () => {
  return (
    <div>
      <p>Can't find what you're looking for...</p>
      <p>
        Feel free to go back to the <Link to="/">Home Page</Link>.
      </p>
      <p>
        Or you can look at all the providers <Link to="results">here</Link>.
      </p>
    </div>
  );
};

const pageNotFoundContent = { title, Content };
export default pageNotFoundContent;
