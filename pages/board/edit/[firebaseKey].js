import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoard } from '../../../api/boardData';
import BoardForm from '../../../components/forms/BoardForm';

export default function EditBoard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBoard(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<BoardForm obj={editItem} />);
}
