import { useEffect, useState } from "react";
import { getList } from "../../service/home.service";
import { CardSummary } from "./cardSummary";
import { getColor } from "../../utils/funtions";

export const Summary = () => {
  const [arraySummary, setArraySummary] = useState([]);
  const [stateLoading, setStateLoading] = useState(false);

  /**
   * Genera un resumen de colores basado en los datos proporcionados.
   * Para cada conjunto de datos, calcula el porcentaje de elementos que caen en cada color (rojo, amarillo, verde, negro, azul).
   */
  const generarResumenColores = (data) => {
    let resumen = [
      { color: "bg-red-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-yellow-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-green-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-black", cantidad: 0, porcentaje: "0%" },
      { color: "bg-blue-500", cantidad: 0, porcentaje: "0%" },
    ];

    const total = data.length;

    // Itera sobre los datos para asignar colores según el valor de cada elemento
    for (let i = 0; i < data.length; i++) {
      const dato = data[i];
      const value = dato.NetFlow + dato.MakeToOrder; // Suma de NetFlow y MakeToOrder
      const color = getColor(value, dato.RedZone, dato.YellowZone, dato.GreenZone); // Determina el color según el valor

      // Incrementa la cantidad correspondiente al color en el resumen
      for (let j = 0; j < resumen.length; j++) {
        if (resumen[j].color === color) {
          resumen[j].cantidad++;
          break;
        }
      }
    }

    // Calcula el porcentaje de cada color basado en su cantidad
    for (let k = 0; k < resumen.length; k++) {
      const cantidad = resumen[k].cantidad;
      const porcentaje = (cantidad / total) * 100;
      resumen[k].porcentaje = porcentaje.toFixed(2) + "%"; // Asigna el porcentaje correspondiente
    }

    return resumen;
  };

  /**
   * Obtiene los datos de la lista y actualiza el estado con el resumen generado.
   * Muestra un indicador de carga mientras se obtienen los datos.
   */
  const getInf = () => {
    setStateLoading(true);
    getList().then((resp) => {
      const objResp = generarResumenColores(resp.Datos);
      setArraySummary(objResp);   

      setStateLoading(false);
    });
  };

  useEffect(() => {
    getInf();
    return () => {};
  }, []);

  return (
    <CardSummary arraySummary={arraySummary} stateLoading={stateLoading} />
  );
};
