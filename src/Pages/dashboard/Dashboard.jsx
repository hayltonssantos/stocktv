import React, { useContext } from "react";
import Header from "../../Components/header/Header";
import styles from './Dashboard.module.css';
import { Chart } from 'react-google-charts';
import { ItemsContext } from "../../Context/itemsContext";

export default function Dashboard() {
  const { getFilteredItems } = useContext(ItemsContext);
  const filteredItems = getFilteredItems();

  // Calculate the codeArrayFilter directly during render
  const codeMap = {};

  filteredItems.forEach((item) => {
    if (codeMap[item.id]) {
      codeMap[item.id] += parseInt(item.quantidade);
    } else {
      codeMap[item.id] = parseInt(item.quantidade);
    }
  });

  const codeArrayFilter = Object.entries(codeMap).map(([id, quantidade]) => ({ id, quantidade }));

  // Create the data array for the chart
  const data = [
    ["Artigo", "Qntd"],
    ...codeArrayFilter.map(item => [item.id, item.quantidade]),
  ];

  const options = {
    chart: {
      title: "Artigos em Estoque",
      subtitle: 'Quantidade por código de artigo'
    },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
    bars: "horizontal",
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container} style={{ height: '400px'}}>
        <Chart
          chartType="Bar"
          width={"90%"}
          height={"85%"}
          data={data}
          options={options}
          chartPackages={["corechart", "controls"]}
          render={({ renderControl, renderChart }) => {
            return (
              <div className={styles.charts}>
                <div style={{ width: "100%" }}>{renderControl(() => true)}</div>
                <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>
              </div>
            );
          }}
          controls={[
            {
              controlType: "StringFilter",
              options: {
                filterColumnIndex: 0,
                matchType: "any", // 'prefix' | 'exact',
                ui: {
                  label: "Search by name",
                },
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
