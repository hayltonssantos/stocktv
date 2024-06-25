import { createContext, useEffect, useState } from 'react';
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../../services/firebase';
import json from '../Data/addArtigos.json';

const ArticleContext = createContext({});

const ArticleProvider = ({ children }) => {
 /*  const [items, setItems] = useState([]);
  const db = getFirestore(firebaseApp);

  const addArtigoListAll = async (local, tipo = '', codigo, artigo, quantidade, obs = '') => {
    const articleData = {
      id: codigo,
      tipo,
      codigo,
      artigo,
      quantidade,
      obs,
    };

    const temp = {
      temp: 'temp',
    };

    local = local.toUpperCase();

    const pathArticle = `articles/${local}/codes/${codigo}`;
    const pathDoc = `articles/${local}`;

    try {
      await setDoc(doc(db, pathDoc), temp);
      await setDoc(doc(db, pathArticle), articleData);
      await updateDoc(doc(db, pathArticle), articleData);
    } catch (error) {
      console.error('Erro ao adicionar artigo: ', error);
    }
  };

  const loadArtigosFromJson = async () => {
    try {
      const artigos = json;
      artigos.forEach(async artigo => {
        await addArtigoListAll(
          artigo.local,
          artigo.tipo,
          artigo.codigo,
          artigo.artigo,
          artigo.quantidade,
          artigo.obs || ''
        );
      });
    } catch (err) {
      console.error("Error loading JSON data:", err);
    }
  };

  useEffect(() => {
    loadArtigosFromJson();
  }, []); */

  return (
    <ArticleContext.Provider value={{  }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
