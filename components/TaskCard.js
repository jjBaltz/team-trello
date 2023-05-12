import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function TaskCard({ taskObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{taskObj.desc}</Card.Title>
        <p className="card-text bold">{taskObj.favorite && <span>Favorite<br /></span> } {taskObj.assignedMember}</p>
        <Link href={`/task/edit/${taskObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    desc: PropTypes.string,
    favorite: PropTypes.bool,
    assignedMember: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default TaskCard;
