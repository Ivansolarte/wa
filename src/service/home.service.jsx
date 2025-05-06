import json from "../utils/DatosPruebas.json";

export const getList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(json);
    }, 1500);
  });
};

export const updateMakeToOrder =async (objetoComparar, newValue) => {    
    const index = json.Datos.findIndex((item) =>
      item.CenterCode === objetoComparar.CenterCode &&
      item.Reference === objetoComparar.Reference &&
      item.VisibleForecastedDate === objetoComparar.VisibleForecastedDate &&
      item.GreenZone === objetoComparar.GreenZone &&
      item.YellowZone === objetoComparar.YellowZone &&
      item.RedZone === objetoComparar.RedZone &&
      item.MakeToOrder === objetoComparar.MakeToOrder
    );  
    if (index !== -1) {
      json.Datos[index].MakeToOrder = newValue;
      return true; 
    }  
    return false; 
  };