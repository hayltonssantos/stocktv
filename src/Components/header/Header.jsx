import React, { useContext, useEffect, useState } from 'react'
import Button from '../../util/button/Button'
import logo from '../../assets/thumb.png'
import styles from './Header.module.css'
import { UserContext } from '../../Context/userContext';
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import MenuMobile from '../menuMobile/MenuMobile';

export default function Header({link = '', onclick = ''}) {
  const { user, signIn, err, signOut, getInformations } = useContext(UserContext)
  const [textSair, setTextSair] = useState('Sair')
  let userNameSliceEmail = ''

  const sectionUser = () =>{
    if (user){
      userNameSliceEmail = getInformations()[1]
      return(
      <a className={styles.link} onClick={(e) => {
        setTextSair('Saindo')
        setTimeout(() =>{
          signOut()
        },1500)
      }}>
        <div className={styles.divLoginArea}>
          <div className={styles.iconDiv}>
            <div className={styles.userInf}>
              <FaRegUserCircle size={'25px'} />
              <span>
                {userNameSliceEmail}
              </span>
            </div>
          </div>
          <div className={styles.iconDiv}>
            <div className={styles.leaveInf}>
              <IoIosLogOut size={'25px'}/>
              <span>
                {textSair}
              </span>
            </div>
          </div>            
        </div>
      </a>
      )
    }else{
      return (
        <a href="/login" className={styles.link}>
          <div className={styles.divLoginArea}>
            <div className={styles.iconDiv}>
              <IoIosLogIn size={'25px'}/>
            </div>            
            <span>
              Entrar
            </span>
          </div>
        </a>
      )
    }
  }
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.photoHeader}>
          <a href="/home">
            <img src={logo}/>
          </a>
          <h3>Armazém TV</h3>
        </div>
        <div className={styles.divMenu}>
          <Button text={'Home'} link={'/home'} onclick={(e) => onclick}/>
          <Button text={'Adicionar Artigo'} link={'/add'} onclick={(e) => onclick}/>
          <Button text={'Ver Log'} link={'/log'} onclick={(e) => onclick}/>
          <Button text={'Config'} link={'/config'} onclick={(e) => onclick}/>
        </div>
        <div className={styles.divBt}>
          {sectionUser()}
        </div>
      </header>
      <div className={styles.menuMobile}>
        <MenuMobile/>
      </div>
    </div>
  )
}
