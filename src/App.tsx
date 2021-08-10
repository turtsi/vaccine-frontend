import styles from "./styles/styles.module.css";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <div className={styles.wrap}>
      <Layout />
    </div>
  );
};

export default App;
