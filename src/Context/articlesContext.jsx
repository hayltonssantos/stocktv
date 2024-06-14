import { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../../services/firebase';

const ArticleContext = createContext({});

const ArticleProvider = ({ children }) => {
  const db = getFirestore(firebaseApp);

  return (
    <ArticleContext.Provider value={{ }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
