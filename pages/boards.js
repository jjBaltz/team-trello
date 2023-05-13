import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBoards } from '../api/boardData';
import BoardCard from '../components/BoardCard';
import { useAuth } from '../utils/context/authContext';

export default function Boards() {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);

  const getAllBoards = () => {
    getBoards(user.uid).then(setBoards);
  };

  useEffect(() => {
    getAllBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/board/newBoard" passHref>
        <Button variant="add-btl">Add New Board</Button>
      </Link>
      <div className="text-center my-4 d-flex flex-wrap">
        {boards.map((board) => (
          <BoardCard key={board.firebaseKey} boardObj={board} onUpdate={getBoards} />
        ))}
      </div>
    </div>
  );
}
