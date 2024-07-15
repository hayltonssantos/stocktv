import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import firebaseApp from '../../../services/firebase';
import styles from './LogScreen.module.css';
import Header from '../../Components/header/Header';
import { FaTrashAlt } from "react-icons/fa";

const LogScreen = () => {
  const [logs, setLogs] = useState([]);
  const db = getFirestore(firebaseApp);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'logs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(logsData);
    });

    return () => unsubscribe();
  }, [db]);

  const deleteConfirm = (logId) => {
    setSelectedLog(logId);
    
  }

  const cancelDelete = () => {
    setSelectedLog(null);
  }

  const deleteLog = async (logId) => {
    try {
      await deleteDoc(doc(db, 'logs', logId));
      setSelectedLog(null);
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  }

  return (
    <div className={styles.logScreen}>
      <Header text={'Home'} link='home' />
      <div className={styles.text}>
        <h3>Log de Alterações e Criações de Artigos</h3>
      </div>
      <div className={styles.logContainer}>
        {logs.map(log => (
          <div key={log.id} className={styles.logEntry}>
            {selectedLog === log.id && (
              <div className={styles.confirmDelete}>
                <button onClick={cancelDelete}>Cancelar</button>
                <button onClick={() => deleteLog(log.id)}>Deletar</button>
              </div>
            )}
            <span className={styles.trash} onClick={() => deleteConfirm(log.id)}>
              <FaTrashAlt />
            </span>
            <p><strong>Ação:</strong> {log.action}</p>
            <p><strong>Local:</strong> {log.local}</p>
            <p><strong>Tipo:</strong> {log.tipo}</p>
            <p><strong>Código:</strong> {log.codigo}</p>
            <p><strong>Artigo:</strong> {log.artigo}</p>
            <p><strong>Quantidade:</strong> {log.quantidade}</p>
            <p><strong>Observação:</strong> {log.obs}</p>
            <p><strong>Data:</strong> {log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogScreen;
