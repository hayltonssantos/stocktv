import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../Context/itemsContext';
import styles from './Articles.module.css';
import Button from '../../util/button/Button';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Articles() {
  const { getFilteredItems, setSearchLocal, setSearchCod, setSearchArt, setSearchTipo } = useContext(ItemsContext);
  const [paramSearch, setParamSearch] = useState('Local');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    setParamSearch(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const editArt = (local, tipo, codigo, artigo, qnt) => {
    console.log('teste');
    setParamSearch({
      l: local,
      t: tipo,
      c: codigo,
      a: artigo,
      q: qnt,
    });

    navigate(
      `/add?l=${encodeURIComponent(local)}&t=${encodeURIComponent(tipo)}&c=${encodeURIComponent(codigo)}&a=${encodeURIComponent(artigo)}&q=${encodeURIComponent(qnt)}`
    );
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
      case 'Tipo':
        setSearchLocal('');
        setSearchCod('');
        setSearchArt('');
        setSearchTipo(text);
        break;
      default:
        break;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <>
      <div>
        <select className={styles.selectS} name="Search" value={paramSearch} onChange={handleChange}>
          <option value="Local">Local</option>
          <option value="Código">Código</option>
          <option value="Artigo">Artigo</option>
          <option value="Tipo">Tipo</option>
        </select>
        <input
          className={styles.inputS}
          type="text"
          name="searchinput"
          value={text}
          onChange={handleTextChange}
        />
        <button onClick={handleSearch}>Procurar</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.tabela}>
          <caption>Artigos Armazém</caption>
          <thead>
            <tr>
              <th scope="col">Local</th>
              <th scope="col">Código</th>
              <th scope="col">Artigo</th>
              <th scope="col">Qntd.</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.local}</td>
                <td>{item.codigo}</td>
                <td>{item.artigo}</td>
                <td>{item.quantidade}</td>
                <td>
                  <span
                    onClick={(e) =>
                      editArt(item.local, item.tipo,item.codigo, item.artigo, item.quantidade)
                    }
                  >
                    <BsFillPencilFill style={{ color: 'black', fontSize: '15px' }} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
