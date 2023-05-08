import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CardComponent({ text }) {
  return (
    <Card className="mb-2">
      <Card.Body>{text}</Card.Body>
    </Card>
  );
}

CardComponent.propTypes = {
  text: PropTypes.string,
};

CardComponent.defaultProps = {
  text: '', // Provide a default value for the "text" prop
};

export default CardComponent;
