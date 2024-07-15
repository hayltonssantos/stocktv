import React from "react";
import Header from "../../Components/header/Header";
import User from "../../Components/user/User";
import Card from "../../Components/card/Card";
import styles from './Config.module.css'

export default function Config(){

  const linkMap = 'https://www.canva.com/design/DAGKAJOyI-w/pxlFyNTJJ0fuEtWSFQiaGw/view?utm_content=DAGKAJOyI-w&utm_campaign=designshare&utm_medium=link&utm_source=editor'

  return(
    <div className={styles.main}>
        <Header/>
      <div className={styles.container}>
        <aside className={styles.perfil}>
          <h3>Inf. Perfil</h3>
          <User/>
        </aside>
        
        <div className={styles.cards}>
          <Card link="/dashboard" text={'Dashboard'}/>
          <Card link={linkMap} text={'Mapa do armazém'}/>
          <Card link="/log" text={'Registro de alteraçoes'}/>
          <Card link='/newuser' text={'Novos Usuários'}/>
          <Card link="/reports" text={'Gerar Backup'}/>
        </div>
      </div>
    </div>
  )
} 