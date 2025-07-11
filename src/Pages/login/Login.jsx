import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import styles from './Login.module.css'
import Input from '../../Components/Input/Input';
import logo from '../../assets/logo.png'

export default function Login({where = '/home'}) {

  const { user, signIn, err, returnUrl, setReturnUrl, handleReset } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
      if (user) {
        navigate(returnUrl || '/login')
      }else{
        const from = location.state?.from?.pathname || "/"
        setReturnUrl(from)
      }
  }, [user, navigate,returnUrl, location.state?.from?.pathname, setReturnUrl])
  
  const handleSingIn = (email, password) => {
    signIn(email, password)

  }
  const wrong = () =>{ if (err) {
    return <p>Wrong email or password</p>
    
  }}
  return (
    <div className={styles.login}>
    <div className={styles.divLogin}>
      <div className={styles.containerMid} >
        <div className={styles.inf}>
          <div>
            <img src={logo} className={styles.logo}></img>
          </div>
          <div>
            <p className={styles.title}>Armazém</p>
            <p className={styles.title}>Torres Vedras</p>
          </div>
        </div>
        
        <div className={styles.containerLogin}>
          <span>{wrong(err)}</span>
          <Input width={'100%'} type={'text'} onChange={setEmail} placeholder={'Email'} />
          <Input width={'100%'} type={'password'} onChange={setPassword} placeholder={'Password'} />
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
          <p onClick={(e) => navigate('/reset')} className={styles.forgot}>Esqueci-me da minha password</p>
        </div>
      </div>
    </div>
    <footer className={styles.footerLogin}>
    S.P.A.S.T.,- Sociedade Portuguesa de Aluguer e Serviço de Têxteis, S.A. © Todos os direitos reservados . Desenvolvido por Haylton Santos
    </footer>
  </div>
  )
}