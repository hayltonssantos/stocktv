import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/userContext";
import Input from '../Input/Input'
import Button from "../../util/button/Button";
import styles from './User.module.css'

export default function User(){
  const {user, getInformations, setEmail, handleReset} = useContext(UserContext)

  return(
    <section>
      <p>Olá, {getInformations()[1]}</p>
      <section>
        <div className={styles.divBut}>
          <span>Mudar Senha</span>
          <Input onChange={setEmail} placeholder={'Digite seu e mail'}/>
          <Button text={'Mudar'} onclick={(e) => {handleReset(e)}}/>
        </div>
      </section>
    </section>
  )
}