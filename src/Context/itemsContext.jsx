import React, { createContext, useEffect, useState } from 'react';
import firebaseApp from '../../services/firebase';
import { getFirestore, addDoc, collection, onSnapshot, query, updateDoc, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const db = getFirestore(firebaseApp);
  const [items, setItems] = useState([]);
  const [searchLocal, setSearchLocal] = useState('');
  const [searchArt, setSearchArt] = useState('');
  const [searchCod, setSearchCod] = useState('');
  const [searchTipo, setSearchTipo] = useState('');
  let [pathArticle, setPathArticle] = useState('');
  let [pathDoc, setPathDoc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'articles'));
        const querySnapshot = await getDocs(q);

        const aux = [];
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const local = doc.id; // Obtém o local como ID do documento
            const codesSnapshot = await getDocs(collection(db, `articles/${local}/codes`)); // Obtém a subcoleção de códigos

            codesSnapshot.docs.forEach((codeDoc) => {
              // Usando docs para acessar os documentos
              const codeData = {
                local,
                id: codeDoc.id, // ID do código de artigo
                ...codeDoc.data(), // Dados do código de artigo
              };
              aux.push(codeData);
            });
          })
        );
        setItems([...aux]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const addLogEntry = async (action, articleData) => {
    const logData = {
      ...articleData,
      action,
      timestamp: serverTimestamp(),
    };


    try {
      await addDoc(collection(db, 'logs'), logData);
    } catch (error) {
      console.error("Error adding log entry: ", error);
    }
  };

  const addArtigo = async (local, tipo = '', codigo, artigo, quantidade, obs = '') => {
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

    pathArticle = `articles/${local}/codes/${codigo}`;
    pathDoc = `articles/${local}`;

    const {id, ...restArticleData} = articleData
    
    try {
      await setDoc(doc(db, pathDoc), temp);
      await setDoc(doc(db, pathArticle), articleData);
      await updateDoc(doc(db, pathArticle), articleData);
      await addLogEntry('create', { ...restArticleData, local }); // Log creation
    } catch (error) {
      throw new Error('Erro ao adicionar artigo: ' + error.message);
    }
  };

  const getFilteredItems = () => {
    return items.filter((item) => {
      const localMatch = searchLocal ? item.local && item.local.toUpperCase().includes(searchLocal.toUpperCase()) : true;
      const codigoMatch = searchCod ? item.codigo && String(item.codigo).toUpperCase().includes(searchCod.toUpperCase()) : true;
      const artigoMatch = searchArt ? item.artigo && item.artigo.toUpperCase().includes(searchArt.toUpperCase()) : true;
      const tipoMatch = searchTipo ? item.tipo && item.tipo.toUpperCase().includes(searchTipo.toUpperCase()) : true;

      return localMatch && codigoMatch && artigoMatch && tipoMatch;
    });
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, getFilteredItems, setSearchLocal, setSearchArt, setSearchCod, addArtigo, setSearchTipo, addLogEntry }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
