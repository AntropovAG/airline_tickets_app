import styles from './App.module.css'
import Header from './components/Header/Header'
import Layout from './components/Layout/Layout'


function App() {

  return (
    <div className={styles.container}>
      <Header />
      <Layout />
    </div>
  )
}

export default App
