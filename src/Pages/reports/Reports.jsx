import React, { useContext, useRef } from 'react';
import styles from './Reports.module.css';
import Card from '../../Components/card/Card';
import Header from '../../Components/header/Header';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { ItemsContext } from '../../Context/itemsContext';

export default function Reports() {
  const targetRef = useRef();
  const { getFilteredItems } = useContext(ItemsContext);
  const filteredItems = getFilteredItems();

  const date = new Date();

  const personalizar = {
    method: 'save',
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.LARGE,
      format: 'A4',
      orientation: 'portrait',
    },
    filename: `StockTV-${date.toLocaleDateString()}.pdf`
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        <h3>Backups</h3>
        <div className={styles.cards}>
          <Card
            click={() => generatePDF(targetRef, personalizar)}
            text={'Gerar PDF'}
          />

          <div id="conteudo" ref={targetRef} className={styles.hiddenTable}>
            <div className={styles.tableContainer}>
              <table className={styles.tabela}>
                <caption>Artigos Armazém</caption>
                <thead>
                  <tr>
                    <th scope="col">Local</th>
                    <th scope="col">Código</th>
                    <th scope="col">Artigo</th>
                    <th scope="col">Qntd.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.local}</td>
                      <td>{item.codigo}</td>
                      <td>{item.artigo}</td>
                      <td>{item.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Card text={'Gerar Excel | Em Construção'} />
        </div>
      </div>
    </div>
  );
}
