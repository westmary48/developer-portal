import PropTypes from 'prop-types';

const informationShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default informationShape;
