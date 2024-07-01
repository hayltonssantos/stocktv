import { createContext, useEffect, useState } from 'react';
import { getFirestore, setDoc, doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import firebaseApp from '../../services/firebase';
import json from '../Data/addArtigos.json';

const ArticleContext = createContext({});

const ArticleProvider = ({ children }) => {
  const db = getFirestore(firebaseApp);

  const addLogEntry = async (action, articleData) => {
    const logData = {
      ...articleData,
      action,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, 'logs'), logData);
      console.log("Log entry added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding log entry: ", error);
    }
  };

  const addArtigoListAll = async (local, tipo = '', codigo, artigo, quantidade, obs = '') => {
    const articleData = {
      id: codigo,
      tipo,
      codigo,
      artigo,
      quantidade,
      obs,
      local,
    };

    const pathArticle = `articles/${local}/codes/${codigo}`;
    const pathDoc = `articles/${local}`;

    try {
      await setDoc(doc(db, pathDoc), { temp: 'temp' });
      await setDoc(doc(db, pathArticle), articleData);
      await updateDoc(doc(db, pathArticle), articleData);
      await addLogEntry('create', articleData); // Log creation
    } catch (error) {
      console.error('Erro ao adicionar artigo: ' + error.message);
    }
  };

  const loadArtigosFromJson = async () => {
    try {
      const artigos = json;
      artigos.forEach(async artigo => {
        await addArtigoListAll(artigo.local, artigo.tipo, artigo.codigo, artigo.artigo, artigo.quantidade, artigo.obs);
      });
    } catch (err) {
      console.error("Error loading JSON data:", err);
    }
  };

  useEffect(() => {
    loadArtigosFromJson();
  }, []);

  return (
    <ArticleContext.Provider value={{ addArtigoListAll }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
