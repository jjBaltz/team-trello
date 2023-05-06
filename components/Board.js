import React, { useState } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import List from './List';
import { lists } from '../utils/data/lists.json';

const Board = () => {
  const [boardLists, setBoardLists] = useState(lists);
  const [newListTitle, setNewListTitle] = useState('');

  // TEST CODE w/o firebase
  const handleNewListClick = () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        id: String(Date.now()),
        title: newListTitle,
        cards: [],
      };
      setBoardLists([...boardLists, newList]);
      setNewListTitle('');
    }
  };

  return (
    <Container className="my-4">
      <div className="d-flex flex-nowrap">
        {boardLists.map(({ id, title, cards }) => (
          <Col key={id}>
            <List style={{ borderRadius: '10' }} title={title} cards={cards} />
          </Col>
        ))}
        <Col>
          <div className="list-add">
            <input
              type="text"
              placeholder="Enter list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <Button variant="success" className="ml-2" style={{ marginTop: '10px' }} onClick={handleNewListClick}>
              Add List
            </Button>
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default Board;
