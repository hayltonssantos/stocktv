import { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../../services/firebase';
import json from './artigos.json'; // Importando o arquivo JSON diretamente

const ArticleContext = createContext({});

const ArticleProvider = ({ children }) => {
  const db = getFirestore(firebaseApp);

  const addArtigoListAll = async (codigo, artigo) => {
    const allArticleData = { 
      codigo: codigo, 
      artigo: artigo
    };

    try {
      const docRef = doc(db, 'allArticles', codigo.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(`Document with ID ${codigo} already exists. Skipping.`);
      } else {
        await setDoc(docRef, allArticleData);
        console.log(`Document with ID ${codigo} has been added.`);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const loadArtigosFromJSON = async () => {
    try {
      // Usando o JSON importado diretamente
      const artigos = json;
  
      console.log("Conteúdo do arquivo JSON:", artigos);
  
      // Verificar se artigos é um array antes de iterá-lo
      if (Array.isArray(artigos)) {
        console.log("artigos é um array.");
        artigos.forEach(async artigo => {
          await addArtigoListAll(artigo.codigo.toString(), artigo.artigo);
        });
      } else {
        console.error("Error: 'artigos' is not an array.");
      }
    } catch (error) {
      console.error("Error loading JSON file: ", error);
    }
  };

  useEffect(() => {
    loadArtigosFromJSON();
  }, []);

  return (
    <ArticleContext.Provider value={{ addArtigoListAll }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
