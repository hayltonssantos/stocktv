import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import styles from './AddArticles.module.css';
import Button from '../../util/button/Button';
import Input from '../../Components/Input/Input';
import { ItemsContext } from '../../Context/itemsContext';
import json from '../../Data/artigos.json'
import { useSearchParams } from 'react-router-dom';

export default function AddArticles() {
  const [local, setLocal] = useState('');
  const [codigo, setCodigo] = useState('');
  const [art, setArt] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState('');
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allArtigos, setAllArtigos] = useState([]);

  const { addArtigo } = useContext(ItemsContext);

  const [ searchParams, setSearchParams] = useSearchParams()
  const paramsNames = [
                      searchParams.get('l') ? searchParams.get('l') : [],
                      searchParams.get('t') ? searchParams.get('t') : [],
                      searchParams.get('c') ? searchParams.get('c') : [],
                      searchParams.get('a') ? searchParams.get('a') : [],
                      searchParams.get('q') ? searchParams.get('q') : [],
                      ]

  useEffect(() => {
    if (paramsNames.length !== -1) {
      setLocal(paramsNames[0])
      setTipo(paramsNames[1])
      setCodigo(paramsNames[2])
      setArt(paramsNames[3])
      setQuantidade(paramsNames[4])
      setQuantidadeAtual(paramsNames[4])
    }
  }, []); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    emptyInputs()

    try {
      await addArtigo(local, tipo, codigo, art, quantidade);
    } catch (err) {
      setError('Erro ao adicionar artigo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadArtigosFromJson = async () => {
    try {
      const artigos = json;
      const artigosArray = artigos.map(artigo => ({
        tipo: artigo.tipo,
        codigo: artigo.codigo,
        artigo: artigo.artigo
      }));
      setAllArtigos(artigosArray);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadArtigosFromJson();
  }, [])

// Função para atualizar o código ao selecionar um artigo
const handleSelectArtigo = (selectedArtigo) => {
  const artigo = allArtigos.find(item => item.artigo === selectedArtigo);
  
  if (artigo) {
    setCodigo(artigo.codigo);
    setTipo(artigo.tipo);
  }
  setArt(selectedArtigo);
};

// Função para atualizar o artigo ao selecionar um código
const handleSelectCodigo = (selectedCodigo) => {
  const artigo = allArtigos.find(item => item.codigo === parseInt(selectedCodigo));
  
  if (artigo) {
    setArt(artigo.artigo);
    setTipo(artigo.tipo);
  }
  setCodigo(selectedCodigo);
};

const emptyInputs = () =>{
  setLocal("")
  setTipo("")
  setCodigo("")
  setArt("")
  setQuantidade("")
  setQuantidadeAtual("")
}

/* // Função para atualizar o artigo ao selecionar um código
const handleSelectTipo = (selectedTipo) => {
  const artigo = allArtigos.find(item => item.tipo === String(selectedTipo));
  
  if (artigo) {
    setArt(artigo.artigo);
    setCodigo(artigo.codigo);
  }
  setTipo(selectedTipo);
}; */

  return (
    <div className={styles.add}>
      <Header text={'Home'} link='home'/>

      <div className={styles.text}>
        <h3>Adicionar Artigo</h3>
      </div>
      
      <div>
        <form className={styles.formInputs} onSubmit={handleSubmit}>
          <div className={styles.divInputs}>
            <span>Local</span>
            <Input 
              type='text'
              placeholder={'Local'}
              onChange={setLocal}
              value={local}
            />
          </div>
          <div className={styles.divInputs}>
            <span>Tipo</span>
            <input 
              type='search'
              list='tipoList'
              placeholder={'Tipo Artigo'}
              onChange={''} // Use handleSelectCodigo para atualizar o código
              value={tipo}
            />
            {/* <datalist id='tipoList' className={styles.codeList}>
              {allArtigos.map((artigo, index) => (
                <option key={index} value={artigo.tipo}/>
              ))}
            </datalist> */}
          </div>
          <div className={styles.divInputs}>
            <span>Código</span>
            <input 
              type='search'
              list='codeList'
              placeholder={'Codigo'}
              onChange={(e) => handleSelectCodigo(e.target.value)} // Use handleSelectCodigo para atualizar o código
              value={codigo}
            />
            <datalist id='codeList' className={styles.codeList}>
              {allArtigos.map((artigo, index) => (
                <option key={index} value={artigo.codigo}/>
              ))}
            </datalist>
          </div>
          <div className={styles.divInputs}>
            <span>Artigo</span>
            <input 
              type='search'
              list='artList'
              placeholder={'Artigo'}
              onChange={(e) => handleSelectArtigo(e.target.value)} // Use handleSelectArtigo para atualizar o artigo
              value={art}
            />
            <datalist id='artList' className={styles.codeList}>
              {allArtigos.map((artigo, index) => (
                <option key={index} value={artigo.artigo}/>
              ))}
            </datalist>
          </div>
          {quantidade !== '' ? 
            <div className={styles.divInputs}>
            <span><b>Qntd Atual</b></span>
            <Input 
              type='text'
              placeholder={'Quantidade Atual'}
              value={quantidadeAtual}
              disabled
            />
          </div>
            
          : ''}
          <div className={styles.divInputs}>
            <span>Qntd.</span>
            <Input 
              type='text'
              placeholder={'Quantidade'}
              onChange={setQuantidade}
              value={quantidade}
            />
          </div>
          <div className={styles.divButton}>
            <Button type='submit' text={loading ? 'Adicionando...' : 'Adicionar'} disabled={loading} />
            
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
