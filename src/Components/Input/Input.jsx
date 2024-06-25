import styles from './Input.module.css'

export default function Input({type, list='',onChange, placeholder, value, width, heigth, required = false, missRequired, disabled = ''}) {

  return (
    <input 
        style={{
          maxWidth: `${width}`,
          maxHeight: `${heigth}`,
          backgroundColor: `${missRequired ? 'lightcoral' : ''}`
        }}
        className={styles.input} type={type}  
        onChange={(e) => {onChange(e.target.value)}} 
        placeholder={placeholder}
        value={value}
        required={required}
        list={list}
        disabled={disabled}
        >
    </input>
  )
}


