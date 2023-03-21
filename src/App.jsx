import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import styles from './App.module.css';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
