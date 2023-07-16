import './Error.css';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  return (
    <div className="errorContainer">
      <p className="message">{error}</p>
    </div>
  );
};

export default Error;

Error.propTypes = {
  error: PropTypes.string,
};
