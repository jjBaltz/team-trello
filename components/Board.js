import React, { useState, useEffect } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import List from './List';
import listsData from '../utils/data/lists.json';

function Board() {
  const [boardLists, setBoardLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [showListForm, setShowListForm] = useState(false);

  useEffect(() => {
    setBoardLists(listsData.lists);
  }, []);

  const handleNewListClick = () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        id: String(Date.now()),
        title: newListTitle,
        cards: [],
      };
      setBoardLists([...boardLists, newList]);
      setNewListTitle('');
      setShowListForm(false);
    }
  };

  const handleButtonClick = () => {
    setShowListForm(true);
  };

  return (
    <Container className="my-4">
      <div className="d-flex flex-nowrap">
        {boardLists.map((list) => (
          <Col key={list.id}>
            <List style={{ borderRadius: '10' }} title={list.title} cards={list.cards} />
          </Col>
        ))}

        {showListForm ? (
          <Col>
            <div className={`list-add ${showListForm ? 'form-background' : ''}`}>
              <input
                style={{ borderRadius: '5px' }}
                type="text"
                placeholder="Enter list title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
              <Button
                variant="primary"
                className="ml-2"
                style={{ marginTop: '10px' }}
                onClick={handleNewListClick}
              >
                Add List
              </Button>
            </div>
          </Col>
        ) : (
          <Col>
            <Button
              variant="dark"
              className="ml-2"
              style={{
                marginTop: '10px',
                backgroundColor: '#b1a7a765',
                border: 'none',
                width: '100%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: 'white',
              }}
              onClick={handleButtonClick}
            >
              + Add another list
            </Button>
          </Col>
        )}
      </div>
    </Container>
  );
}

export default Board;
