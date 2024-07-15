import React, { useContext, useState } from "react";
import Header from "../../Components/header/Header";
import styles from './CreateUser.module.css'
import Input from '../../Components/Input/Input'
import Button from "../../util/button/Button";  

import { UserContext } from "../../Context/userContext";

export default function Config(){
  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const {handleCreate} = useContext(UserContext)
  return(
    <div className={styles.main}>
        <Header/>
      <div className={styles.container}>
        <h3>Novo Usuário</h3>
        <div>
          <label>Email</label>
          <Input placeholder={'Email'} onChange={setEmail}></Input>
        </div>
        <div>
          <label>Senha</label>
          <Input placeholder={'Senha'} onChange={setSenha}></Input>
        </div>
        <Button text={'Criar'} onclick={(e) => handleCreate(e, email, senha)} />
      </div>
    </div>
  )
} 