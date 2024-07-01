import { createContext, useEffect, useState } from 'react';
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../../services/firebase';
import json from '../Data/addArtigos.json';

const ArticleContext = createContext({});

const ArticleProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const db = getFirestore(firebaseApp);

  return (
    <ArticleContext.Provider value={{  }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
