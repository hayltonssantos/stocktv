import React from "react";
import styles from './Card.module.css'

export default function Card({link = '', text, click}){
  if (link !== '')
  {  
    return(
      <a href={link} className={styles.card}>
        <p>{text}</p>
      </a>
    )
  }else{
    return(
      <div onClick={click} className={styles.card}>
        <p>{text}</p>
      </div>
    )
  }
}