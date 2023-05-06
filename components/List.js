import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';

const List = ({ title, cards }) => {
  const [newCardText, setNewCardText] = useState('');
  const [listCards, setListCards] = useState(cards);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleNewCardClick = () => {
    const newCard = {
      id: String(Date.now()),
      text: newCardText,
    };
    setListCards([...listCards, newCard]);
    setNewCardText('');
    setShowForm(false); // Hide the form after adding a new card
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
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              placeholder="Enter a new card"
              required
            />
          </Form.Group>
          <Button variant="success" style={{ marginTop: '20px' }} onClick={handleNewCardClick}>
            Add Card
          </Button>
        </Form>
      )}
      {!showForm && ( // Render the "Add" button when showForm is false
        <Button variant="primary" onClick={() => setShowForm(true)}>
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
