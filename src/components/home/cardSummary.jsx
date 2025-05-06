import React from "react";
import { Loading } from "../modals/loading";

export const CardSummary = ({ arraySummary, stateLoading }) => {
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
    <div className="m-10  flex justify-center">
      <div className="border rounded-lg border-2 border-slate-600">
        <p className=" text-center font-extrabold text-3xl my-2">
          Resumen de los datos{" "}
        </p>
        {arraySummary.map((item, index) => (
          <div key={index} className="flex p-3">
            <p className="w-[150px]">
              Color:
              <span className="ml-2 font-bold">
                {selectColor[item.color.split("-")[1]]}
              </span>
            </p>
            <p className="ml-2 w-[140px]">
              Cantidad:<span className="m-2">{item.cantidad}</span>
            </p>
            <div className=" w-[100px]">
              <div className="w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 z-20">
                <div
                  className={`text-xs font-medium text-blue-100 text-center py-3 leading-none rounded-full z-0 ${item.color}`}
                  //   style={{ width: `50%` }}
                  style={{ width: `${parseFloat(item.porcentaje)}%` }}
                ></div>
              </div>
            </div>
            <p className="ml-2 w-[150px]">
              Porcentaje:<span className="ml-2">{item.porcentaje}</span>
            </p>
          </div>
        ))}
        <p className="w-[150px] m-3">
          Total:<span className="ml-5 text-xl font-bold">{totalCant}</span>
        </p>
      </div>
      {stateLoading && <Loading />}
    </div>
  );
};
