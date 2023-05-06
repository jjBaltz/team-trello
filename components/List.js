import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';

const List = ({ title, cards }) => {
  const [newCardText, setNewCardText] = useState('');
  const [listCards, setListCards] = useState(cards);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleNewCardSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const newCard = {
      id: String(Date.now()),
      text: newCardText,
    };
    setListCards([...listCards, newCard]);
    setNewCardText('');
    setShowForm(false); // Hide the form after adding a new card
  };

  const handleFormCancel = () => {
    setShowForm(false); // Hide the form on cancel button click
    setNewCardText(''); // Clear the input field
  };

  return (
    <div className="list">
      <h4>{title}</h4>
      {listCards.map((card) => (
        <Card style={{ borderRadius: '10' }} key={card.id} className="mb-2">
          <Card.Body>{card.text}</Card.Body>
        </Card>
      ))}
      {showForm && ( // Render the form only if showForm is true
        <Form onSubmit={handleNewCardSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              placeholder="Enter a title for this card..."
              required
            />
          </Form.Group>
          <Button className="addButton" variant="primary" style={{ marginTop: '20px' }} type="submit">
            Add Card
          </Button>
          <Button
            className="cancelButton"
            variant="light"
            style={{
              marginTop: '20px',
              marginLeft: '10px',
              border: 'none',
              background: 'none',
            }}
            onClick={handleFormCancel}
          >
            X
          </Button>
        </Form>
      )}
      {!showForm && ( // Render the "Add" button when showForm is false
        <Button
          className="addCard"
          variant="primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'none',
            border: 'none',
            color: 'black',
            width: '100%',
          }}
          onClick={() => setShowForm(true)}
        >
          + Add a card
        </Button>
      )}
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
};

export default List;
