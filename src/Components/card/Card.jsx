import React from "react";
import styles from './Card.module.css'

export default function Card({link = '', text}){
  return(
    <a href={link} className={styles.card}>

      <p>{text}</p>
    </a>
  )
}