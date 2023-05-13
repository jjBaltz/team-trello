/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewBoardDetails } from '../../api/mergedData';
import ListCard from '../../components/ListCard';
import { getBoardList } from '../../api/boardData';

export default function ViewBoard() {
  const [boardDetails, setBoardDetails] = useState({});
  const [lists, setLists] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;
  const getAllBoardsList = () => {
    getBoardList(firebaseKey).then(setLists);
  };

  useEffect(() => {
    viewBoardDetails(firebaseKey).then(setBoardDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getAllBoardsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-white mt-5 details">
          <h2>
            {boardDetails.boardTitle}
            {boardDetails.favorite ? ' ☆' : ''}
          </h2>
        </div>
      </div>
      <br />
      <h3 className="text-black details text-left">Project Board</h3>
      <Link href="/list/newList" passHref>
        <Button variant="primary">Add A List</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {lists.map((list) => (
          <ListCard key={list.firebaseKey} listObj={list} onUpdate={getAllBoardsList} />
        ))}
      </div>
    </>
  );
}
