import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import styles from './AllArticles.module.css';
import Button from '../../util/button/Button';
import Input from '../../Components/Input/Input';
import { ItemsContext } from '../../Context/itemsContext';
import json from '../../Data/artigos.json'; // Assuming this is your JSON file
import { useSearchParams } from 'react-router-dom';

export default function AllArticles() {
  const [local, setLocal] = useState('');
  const [codigo, setCodigo] = useState('');
  const [art, setArt] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState('');
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allArtigos, setAllArtigos] = useState([]);
  const [newTipo, setNewTipo] = useState('');
  const [newCodigo, setNewCodigo] = useState('');
  const [newArtigo, setNewArtigo] = useState('');

  const { addArtigo } = useContext(ItemsContext);

  const [searchParams] = useSearchParams();
  const paramsNames = [
    searchParams.get('t') || '',
    searchParams.get('c') || '',
    searchParams.get('a') || ''
  ];

  useEffect(() => {
    if (paramsNames.length !== 0) {
      setTipo(paramsNames[0]);
      setCodigo(paramsNames[1]);
      setArt(paramsNames[2]);
    }
  }, [paramsNames]);

  useEffect(() => {
    loadArtigosFromJson();
  }, []);

  const loadArtigosFromJson = () => {
    try {
      const artigosArray = Object.values(json).map(item => ({
        tipo: item.tipo,
        codigo: item.codigo,
        artigo: item.artigo
      }));
      setAllArtigos(artigosArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    emptyInputs();

    try {
      await addArtigo(local, tipo, codigo, art, quantidade);
    } catch (err) {
      setError('Erro ao adicionar artigo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArtigo = (selectedArtigo) => {
    const artigo = allArtigos.find(item => item.artigo === selectedArtigo);

    if (artigo) {
      setCodigo(artigo.codigo);
      setTipo(artigo.tipo);
    }
    setArt(selectedArtigo);
  };

  const handleSelectCodigo = (selectedCodigo) => {
    const artigo = allArtigos.find(item => item.codigo === selectedCodigo);

    if (artigo) {
      setArt(artigo.artigo);
      setTipo(artigo.tipo);
    }
    setCodigo(selectedCodigo);
  };

  const emptyInputs = () => {
    setTipo('');
    setCodigo('');
    setArt('');
  };

  const handleEditSubmit = () => {
    // Ensure newTipo, newCodigo, and newArtigo are filled
    if (newTipo && newCodigo && newArtigo) {
      // Create or update the entry in the json object
      const updatedJson = {
        ...json,
        [newCodigo]: {
          tipo: newTipo,
          codigo: newCodigo,
          artigo: newArtigo
        }
      };

      // Update the state and potentially save the updated json
      setAllArtigos(Object.values(updatedJson));
      console.log(updatedJson); // For debugging

      // Here you would typically save `updatedJson` back to the file or send it to a server
      // Example: saveToJsonFile(updatedJson);
    }
  };

  return (
    <div className={styles.add}>
      <Header text={'Home'} link='home' />

      <div className={styles.text}>
        <h3>Editar/Adicionar Artigo</h3>
      </div>

      <div>
        <form className={styles.formInputs} onSubmit={handleSubmit}>
          <div className={styles.divInputs}>
            <span>Tipo</span>
            <input
              type='text'
              placeholder='Novo Tipo'
              value={newTipo}
              onChange={(e) => setNewTipo(e.target.value)}
            />
          </div>
          <div className={styles.divInputs}>
            <span>Código</span>
            <input
              type='text'
              placeholder='Novo Código'
              value={newCodigo}
              onChange={(e) => setNewCodigo(e.target.value)}
            />
          </div>
          <div className={styles.divInputs}>
            <span>Artigo</span>
            <input
              type='text'
              placeholder='Novo Artigo'
              value={newArtigo}
              onChange={(e) => setNewArtigo(e.target.value)}
            />
          </div>
          <div className={styles.divButton}>
            <Button
              type='button'
              text='Salvar Alterações'
              onClick={handleEditSubmit}
            />
          </div>
          <div className={styles.divInputs}>
            <span>Tipo</span>
            <input
              type='search'
              list='tipoList'
              placeholder={'Tipo Artigo'}
              onChange={handleSelectCodigo}
              value={tipo}
            />
          </div>
          <div className={styles.divInputs}>
            <span>Código</span>
            <input
              type='search'
              list='codeList'
              placeholder={'Código'}
              onChange={(e) => handleSelectCodigo(e.target.value)}
              value={codigo}
            />
            <datalist id='codeList' className={styles.codeList}>
              {allArtigos.map((artigo, index) => (
                <option key={index} value={artigo.codigo} />
              ))}
            </datalist>
          </div>
          <div className={styles.divInputs}>
            <span>Artigo</span>
            <input
              type='search'
              list='artList'
              placeholder={'Artigo'}
              onChange={(e) => handleSelectArtigo(e.target.value)}
              value={art}
            />
            <datalist id='artList' className={styles.codeList}>
              {allArtigos.map((artigo, index) => (
                <option key={index} value={artigo.artigo} />
              ))}
            </datalist>
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
