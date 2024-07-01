import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import styles from './Reset.module.css'
import Input from '../../Components/Input/Input';
import logo from '../../assets/logo.png'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '../../../services/firebase';
import { getFirestore} from 'firebase/firestore';


export default function Reset({where = '/home'}) {

  const { user, signIn, err, returnUrl, setReturnUrl, handleReset, setEmail } = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  
  const db = getFirestore(firebaseApp);

  useEffect(() => {
      if (user) {
        navigate(returnUrl || '/login')
      }else{
        const from = location.state?.from?.pathname || "/"
        setReturnUrl(from)
      }
  }, [user, navigate,returnUrl, location.state?.from?.pathname, setReturnUrl])
  
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
        <p className={''}>Reset de password</p>
        <div className={styles.containerLogin}>
          <span>{wrong(err)}</span>
          <Input width={'100%'} type={'text'} onChange={setEmail} placeholder={'Email'} />
          
          <div className={styles.btn}>    
              <button className={styles.btnB}
                  onClick={() => {navigate('/home')}}>
                  Cancel
              </button>
              <button className={styles.btnB}
                  onClick={(e) => {
                    handleReset(e)
                    setTimeout(() =>{
                      navigate('/home')
                    },1500)
                    }}>
                  Reset
              </button>
          </div>
        </div>
      </div>
    </div>
    <footer className={styles.footerLogin}>
    S.P.A.S.T.,- Sociedade Portuguesa de Aluguer e Serviço de Têxteis, S.A. © Todos os direitos reservados . Desenvolvido por Haylton Santos
    </footer>
  </div>
  )
}