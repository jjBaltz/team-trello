import React, { useState } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import List from './List';
import { lists } from '../utils/data/lists.json';

const Board = () => {
  const [boardLists, setBoardLists] = useState(lists);
  const [newListTitle, setNewListTitle] = useState('');
  const [showListForm, setShowListForm] = useState(false); // State to control list form visibility

  const handleNewListClick = () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        id: String(Date.now()),
        title: newListTitle,
        cards: [],
      };
      setBoardLists([...boardLists, newList]);
      setNewListTitle('');
      setShowListForm(false); // Hide the list form after adding a new list
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
        {showListForm ? ( // Render the list form only if showListForm is true
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
        ) : (
          <Col>
            <Button variant="primary" className="ml-2" style={{ marginTop: '10px' }} onClick={() => setShowListForm(true)}>
              + Add a list
            </Button>
          </Col>
        )}
      </div>
    </Container>
  );
};

export default Board;
