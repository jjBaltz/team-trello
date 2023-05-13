/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBoards } from '../api/boardData';
import Board from '../components/BoardCard';

function Home() {
  const [boards, setBoards] = useState([]);
  const { user } = useAuth();

  const getAllBoards = () => {
    getBoards(user.uid).then(setBoards);
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >

      <h1>Hello {user.displayName}! </h1>
      <Link href="/board/newBoard" passHref>
        <Button>Create a Project</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {boards.map((board) => (
          <Board key={board.firebaseKey} boardObj={board} onUpdate={getBoards} />
        ))}
      </div>
    </div>

  );
}

export default Home;
