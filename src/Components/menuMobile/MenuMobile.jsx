import react from 'react'
import styles from './MenuMobile.module.css'

export default function MenuMobile(){
  return (
    <div className={styles.divList}>
      <ul className={styles.list}>
        <li className={styles.listU}>
          <a href="/home">Home</a>
        </li>
        <li className={styles.listU}>
          <a href="/add">Adicionar Artigo</a>
        </li>
        <li className={styles.listU}>
          <a href="/log">Log</a>
        </li>
        <li className={styles.listU}>
          <a href="/Config">Config</a>
        </li>
      </ul>
    </div>
  )
}