import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function UserInfo() {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.photoURL} />
      <Card.Body>
        <Card.Title>{user.displayName}</Card.Title>
        <Card.Text>
          {user.email}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Last Sign In: {user.metadata.lastSignInTime}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

UserInfo.propTypes = {
  userObj: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }).isRequired,
};
