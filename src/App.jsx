import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import styles from './App.module.css'  

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;


