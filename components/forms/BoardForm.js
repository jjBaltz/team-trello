import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  boardTitle: '',
  card: '',
  favorite: false,
  members: '',
};
function BoardForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (obj.firebaseKey) {
  //     updateBoard(formInput)
  //       .then(() => router.push(`/board/${obj.firebaseKey}`));
  //   } else {
  //     const payload = { ...formInput, uid: user.uid };
  //     createBoard(payload).then(({ name }) => {
  //       const patchPayload = { firebaseKey: name };
  //       updateBoard(patchPayload).then(() => {
  //         router.push('/');
  //       });
  //     });
  //   }
  // };

  return (
    // <Form onSubmit={handleSubmit}>
    <Form>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Project Board</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Project Board Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Project Board title"
          name="boardTitle"
          value={formInput.boardTitle}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Board</Button>
    </Form>
  );
}

BoardForm.propTypes = {
  obj: PropTypes.shape({
    boardTitle: PropTypes.string,
    card: PropTypes.string,
    favorite: PropTypes.bool,
    members: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BoardForm.defaultProps = {
  obj: initialState,
};
export default BoardForm;

// Change labels, name , and values in the form
