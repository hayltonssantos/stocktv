import React, { useContext, useState } from 'react'
import Button from '../../util/button/Button'
import { ItemsContext } from '../../Context/itemsContext'

export default function Search() {
  const [search, setSearch] = useState('')
  const [paramSearch, setParamSearch] = useState('')
  const {getItems} = useContext(ItemsContext)

  const getSearch = (paramSearch = 'Código' ,text) =>{
    setSearch(text)
    paramSearch == '' ? getItems() : ''
    paramSearch == 'Local' ? getItems(searchLocal = '') : ''
    paramSearch == 'Codigo' ? getItems(searchCod = '001') : ''
    paramSearch == 'Artigo' ? getItems(searchArt = '') : ''

  }
  return (
    <div>
      <select name='Search' onChange={(e) => setParamSearch(e.target.value)}>
        <option value="Local">Local</option>
        <option value="Código">Código</option>
        <option value="Artigo">Artigo</option>
      </select>
      <input type="text" name="search" id="" onChange={(e) => getSearch(paramSearch,e.target.value)}/>
      <Button text={"Procurar"}/>
    </div>
  )
}
