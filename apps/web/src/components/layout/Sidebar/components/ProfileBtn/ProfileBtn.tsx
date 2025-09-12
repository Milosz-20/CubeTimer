import { Link } from 'react-router-dom';
import styles from './ProfileBtn.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const ProfileBtn: React.FC = () => {
  const username = useSelector(
    (state: RootState) => state.user.currentUser?.username
  );

  return (
    <Link to='/users/me' className={styles.profileBtn}>
      <div className={styles.avatar}>{/* Miejsce na zdjęcie profilowe */}</div>
      <span className={styles.username}>{username}</span>
    </Link>
  );
};

export default ProfileBtn;
