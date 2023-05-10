import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTask, getListTasks, updateTask } from '../../api/taskData';

const initialState = {
  desc: '',
  favorite: false,
  assignedMember: '',
};
function TaskForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [list, setList] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getListTasks(user.uid).then(setList);

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
      updateTask(formInput)
        .then(() => router.push(`/task/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTask(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTask(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Task</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ROLE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Member Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Describe Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LIST SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="List">
        <Form.Select
          aria-label="List"
          name="listTitle"
          onChange={handleChange}
          className="mb-3"
          value={formInput.listTitle}
          required
        >
          <option value="">Select a List Affiliation</option>
          {
            list.map((listKey) => (
              <option
                key={listKey.firebaseKey}
                value={listKey.firebaseKey}
              >
                {listKey.listTitle}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Task</Button>
    </Form>
  );
}

TaskForm.propTypes = {
  obj: PropTypes.shape({
    desc: PropTypes.string,
    favorite: PropTypes.bool,
    assignedMember: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TaskForm.defaultProps = {
  obj: initialState,
};

export default TaskForm;

// Change labels, name , and values in the form
