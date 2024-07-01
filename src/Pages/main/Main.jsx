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
      <footer className={styles.footerLogin}>
        S.P.A.S.T.,- Sociedade Portuguesa de Aluguer e Serviço de Têxteis, S.A. © Todos os direitos reservados . Desenvolvido por Haylton Santos
      </footer>
    </main>
  )
}
