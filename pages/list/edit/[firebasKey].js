import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleList } from '../../../api/listData';
import ListForm from '../../../components/forms/ListForm';

export default function EditList() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleList(firebaseKey).then(setEditItem(firebaseKey));
  }, [firebaseKey]);

  return (<ListForm obj={editItem} />);
}
