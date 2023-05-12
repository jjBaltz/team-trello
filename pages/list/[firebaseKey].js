/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewListDetails } from '../../api/mergedData';
import { getListTasks } from '../../api/taskData';
import TaskCard from '../../components/TaskCard';

export default function ViewList() {
  const [listDetails, setListDetails] = useState({});
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewListDetails(firebaseKey).then(setListDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getListTasks(firebaseKey).then(setTasks);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-black mt-5 details">
          <h2>
            {listDetails.listTitle}
            {listDetails.favorite ? ' ♡' : ''}
          </h2>
        </div>
      </div>
      <br />
      <Link href="/list/newlist" passHref>
        <Button variant="primary">Add A List</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {tasks.map((task) => (
          <TaskCard key={task.firebaseKey} taskObj={task} onUpdate={getListTasks} />
        ))}
      </div>
    </>
  );
}
