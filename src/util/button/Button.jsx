import React from 'react'

export default function ({text, onclick}) {
  return (
    <button onClick={onclick}>{text}</button>
  )
}
