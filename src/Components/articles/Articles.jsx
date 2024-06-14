import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../Context/itemsContext';
import styles from './Articles.module.css'

export default function Articles() {
  const { getFilteredItems, setSearchLocal, setSearchCod, setSearchArt } = useContext(ItemsContext);
  const [paramSearch, setParamSearch] = useState('Local');
  const [text, setText] = useState('');
  
  const handleChange = (e) => {
    setParamSearch(e.target.value);
  };

  const handleSearch = () => {
    switch (paramSearch) {
      case 'Local':
        setSearchLocal(text);
        setSearchCod('');
        setSearchArt('');
        break;
      case 'Código':
        setSearchLocal('');
        setSearchCod(text);
        setSearchArt('');
        break;
      case 'Artigo':
        setSearchLocal('');
        setSearchCod('');
        setSearchArt(text);
        break;
      default:
        break;
    }
  };

  const filteredItems = text ? getFilteredItems() : getFilteredItems([]);

  return (
    <>
      <div>
        <select name='Search' value={paramSearch} onChange={handleChange}>
          <option value="Local">Local</option>
          <option value="Código">Código</option>
          <option value="Artigo">Artigo</option>
        </select>
        <input type="text" name="searchinput" onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSearch}>Procurar</button>
      </div>
      <table className={styles.tabela}>
        <caption>Artigos Armazém</caption>
        <thead>
          <tr>
            <th scope='col'>Local</th>
            <th scope='col'>Código</th>
            <th scope='col'>Artigo</th>
            <th scope='col'>Qntd.</th>
            <th scope='col'>Obs</th>
            <th scope='col'>Editar</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.local}</td>
              <td>{item.codigo}</td>
              <td>{item.artigo}</td>
              <td>{item.quantidade}</td>
              <td>{item.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
