import CitySearch from './components/CitySearch';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cities Explorer</h1>
      </header>
      <main>
        <CitySearch />
      </main>
    </div>
  );
}

export default App; 