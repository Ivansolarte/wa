import React from "react";
import { Loading } from "../modals/loading";

export const CardSummary = ({ arraySummary, stateLoading, big = false }) => {
  const selectColor = {
    red: "Rojo",
    yellow: "Amarillo",
    green: "Verde",
    black: "Negro",
    blue: "Azul",
  };
  //   calculo el total de cantidad de de celdas
  const totalCant = arraySummary.reduce((acc, item) => acc + item.cantidad, 0);
  return (
    <div className="summary-wrapper">
      <div className="summary-box">
        <p className="summary-title">{`Resumen ${big?"de la columna":"de todos los datos"}`}</p>
        {arraySummary.map((item, index) => (
          <div key={index} className="summary-row">
            <p className="summary-color">
              Color:
              <span className="ml-2 font-bold">
                {selectColor[item.color.split("-")[1]]}
              </span>
            </p>
            <p className="summary-cantidad">
              Cantidad:<span className="m-2">{item.cantidad}</span>
            </p>
            {!big ? (
              <div className="summary-bar-container">
                <div className="summary-bar-bg">
                  <div
                    className={`summary-bar ${item.color}`}
                    style={{ width: `${parseFloat(item.porcentaje)}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start w-[250px] ">
                {Array.from({ length: Math.min(item.cantidad, 10) }).map(() => (
                  <div
                    className={`h-8 w-7 border-slate-100 border ${item.color}`}
                  ></div>
                  
                ))}
                {item.cantidad >10 &&<p className="text-lg animate-pulse" title={`Cantidad es de ${item.cantidad}`}>...</p>}
              </div>
            )}
            <p className="summary-porcentaje">
              Porcentaje:<span className="ml-2">{item.porcentaje}</span>
            </p>
          </div>
        ))}
        <p className="summary-total">
          Total:<span className="summary-total-value">{totalCant}</span>
        </p>
      </div>
      {stateLoading && <Loading />}
    </div>
  );
};
