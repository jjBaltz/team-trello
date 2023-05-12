/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTaskDetails } from '../../api/mergedData';

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTaskDetails(firebaseKey).then(setTaskDetails);
  }, [firebaseKey]);

  return (
    <>
      <h1>{taskDetails.desc}</h1>
    </>
  );
}
