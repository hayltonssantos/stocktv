import React, { useContext } from 'react'
import Button from '../../util/button/Button'
import logo from '../../assets/thumb.png'
import styles from './Header.module.css'
import { ArticleContext } from '../../Context/articlesContext'

export default function Header() {
  const {addArtigoListAll} = useContext(ArticleContext)
  return (
    <header className={styles.header}>
      <div className={styles.photoHeader}>
        <a href="#">
          <img src={logo}/>
        </a>
        <h3>Armazém TV</h3>
      </div>
      <div>
        <Button text={"Adicionar Artigo"} onclick={(e) => (addArtigoListAll())}/>
      </div>
    </header>
  )
}
