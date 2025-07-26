import { Header, Status, List } from "./components";
import styles from "./NotificationsModule.module.css";
const NotificationsModule: React.FC = () => {
  return (
    <main className={styles.container}>
      <Header />
      <Status />
      <List />
    </main>
  );
};
export default NotificationsModule;
