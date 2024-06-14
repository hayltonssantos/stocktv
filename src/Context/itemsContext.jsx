import React, { createContext, useEffect, useState } from 'react';
import firebaseApp from '../../services/firebase';
import { getFirestore, addDoc, collection, onSnapshot, query, updateDoc, doc, setDoc, getDocs } from 'firebase/firestore';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  
  const db = getFirestore(firebaseApp);
  const [items, setItems] = useState([]);
  const [searchLocal, setSearchLocal] = useState('');
  const [searchArt, setSearchArt] = useState('');
  const [searchCod, setSearchCod] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'articles'));
        const querySnapshot = await getDocs(q);
  
        const aux = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
          const local = doc.id; // Obtém o local como ID do documento
          const codesSnapshot = await getDocs(collection(db, `articles/${local}/codes`)); // Obtém a subcoleção de códigos
          
          codesSnapshot.docs.forEach((codeDoc) => { // Usando docs para acessar os documentos
            const codeData = {
              local,
              id: codeDoc.id, // ID do código de artigo
              ...codeDoc.data() // Dados do código de artigo
            };
            aux.push(codeData);
          });
        }));
        setItems([...aux]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);

  const addArtigo = async (local, codigo, artigo, quantidade) => {
    const articleData = {
      codigo,
      artigo,
      quantidade
    };

    // Adiciona o artigo à subcoleção de códigos do local correspondente
    await addDoc(collection(db, `articles/${local}/codes`), articleData);
  };

  const getFilteredItems = () => {
    return items.filter(item =>
      (searchLocal ? item.local.toLowerCase().includes(searchLocal.toLowerCase()) : true) &&
      (searchCod ? item.codigo.toLowerCase().includes(searchCod.toLowerCase()) : true) &&
      (searchArt ? item.artigo.toLowerCase().includes(searchArt.toLowerCase()) : true)
    );
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, getFilteredItems, setSearchLocal, setSearchArt, setSearchCod, addArtigo }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
