import React from "react";
import Header from "../../Components/header/Header";
import User from "../../Components/user/User";
import Card from "../../Components/card/Card";
import styles from './Config.module.css'

export default function Config(){
  return(
    <div className={styles.main}>
        <Header/>
      <div className={styles.container}>
        <aside className={styles.perfil}>
          <h3>Inf. Perfil</h3>
          <User/>
        </aside>
        <div className={styles.cards}>
          <Card link="/log" text={'Registro de alteraçoes'}/>
          <Card text={'Novos Usuários'}/>
          <Card text={'Gerar Relatórios'}/>
        </div>
      </div>
    </div>
  )
} 