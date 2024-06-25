import React from 'react'
import Header from '../../Components/header/Header'
import styles from './Main.module.css'
import Articles from '../../Components/articles/Articles'
import Search from '../../Components/search/Search'

export default function Main() {
  return (
    <main className={styles.main}>
      <Header text={"Adicionar Artigo"} link='/add'/>
      <div>
        <Articles/>
      </div>
    </main>
  )
}
