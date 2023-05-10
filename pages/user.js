import UserInfo from '../components/UserCard';
import { useAuth } from '../utils/context/authContext';
import Signout from '../components/Signout';

export default function User() {
  const { user } = useAuth();
  return (
    <>
      <UserInfo userObj={user} />
      <Signout />
    </>
  );
}
