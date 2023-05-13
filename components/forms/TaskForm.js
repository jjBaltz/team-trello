import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTask, getListTasks, updateTask } from '../../api/taskData';

const initialState = {
  id: '',
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
      createTask(payload).then(() => {
        router.push(`/task/${obj.firebaseKey}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Task</h2>

      <FloatingLabel controlId="floatingInput1" label="Decription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          name="desc"
          value={formInput.desc}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

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
          <option value="">Project List</option>
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
