import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import styles from './Login.module.css'
import Input from '../../Components/Input/Input';
import logo from '../../assets/logo.png'

export default function Login() {

  const { user, signIn, err } = useContext(UserContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
      if (user) navigate('/add')
  }, [user])
  
  const handleSingIn = (email, password) => {
    signIn(email, password)

  }
  const wrong = () =>{ if (err) {
    return <p>Wrong email or password</p>
    
  }}
  return (
    <div className={styles.divLogin}>
      <div className={styles.containerMid} >
        <img src={logo} className={styles.logo}></img>
        <span className={styles.title}>Armazém Torres Vedras</span>
        
        <div className={styles.containerLogin}>
          <span>{wrong(err)}</span>
          <Input type={'text'} onChange={setEmail} placeholder={'Email'} />
          <Input type={'password'} onChange={setPassword} placeholder={'Password'} />
          <div className={styles.btn}>    
              <button className={styles.btnB}
                  onClick={() => {handleSingIn(email, password)}}>
                  Login
              </button>
              <button className={styles.btnB}
                  onClick={() => {navigate('/home')}}>
                  Home
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}