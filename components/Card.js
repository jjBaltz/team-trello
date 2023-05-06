import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CardComponent = ({ text }) => {
  <Card className="mb-2">
    <Card.Body>{text}</Card.Body>
  </Card>;
};

CardComponent.propTypes = {
  text: PropTypes.string,
};

export default CardComponent;
