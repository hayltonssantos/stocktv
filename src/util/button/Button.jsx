import React from 'react'
import styles from './Button.module.css'

export default function ({text, onclick, link = '', type='', children}) {
  if (link === ''){
    return (
      <button className={styles.btnB} 
        type={type} 
        onClick={(e) => onclick}>
          {children}
          {text}
      </button>
    )
  }else{
    return(
      <a className={styles.link} href={link}>
        <button className={styles.btnB} >
          {children}
          {text}
        </button>
      </a>
    )
  }
}
