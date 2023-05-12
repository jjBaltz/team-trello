import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBoardLists } from '../api/mergedData';

function BoardCard({ boardObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisBoard = () => {
    if (window.confirm(`Delete ${boardObj.boardTitle}?`)) {
      deleteBoardLists(boardObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{boardObj.boardTitle}</Card.Title>
        <p className="card-text bold">{boardObj.favorite ? '☆' : ''}</p>
        <Link href={`/board/${boardObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/board/edit/${boardObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBoard} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BoardCard.propTypes = {
  boardObj: PropTypes.shape({
    boardTitle: PropTypes.string,
    card: PropTypes.string,
    favorite: PropTypes.bool,
    members: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BoardCard;
