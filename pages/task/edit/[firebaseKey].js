import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTask } from '../../../api/taskData';
import TaskForm from '../../../components/forms/TaskForm';

export default function EditTask() {
  const [editTask, setEditTask] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTask(firebaseKey).then(setEditTask);
  }, [firebaseKey]);

  return (<TaskForm obj={editTask} />);
}
