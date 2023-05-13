import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getBoards } from '../../api/boardData';
import { createList, updateList } from '../../api/listData';

const initialState = {
  listTitle: '',
};
function ListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [board, setBoard] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getBoards(user.uid).then(setBoard);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateList(formInput)
        .then(() => router.push(`/list/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createList(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} List</h2>

      {/* LIST TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="List Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title"
          name="listTitle"
          value={formInput.listTitle}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* BOARD SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Board">
        <Form.Select
          aria-label="Board"
          name="board_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.board_id}
          required
        >
          <option value="">Select a Project Board</option>
          {
            board.map((boardKey) => (
              <option
                key={boardKey.firebaseKey}
                value={boardKey.firebaseKey}
              >
                {boardKey.boardTitle}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} List</Button>
    </Form>
  );
}

ListForm.propTypes = {
  obj: PropTypes.shape({
    listTitle: PropTypes.string,
    board_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ListForm.defaultProps = {
  obj: initialState,
};

export default ListForm;
