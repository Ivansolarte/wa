import { useEffect, useState } from "react";
import { getList } from "../../service/home.service";
import { CardSummary } from "./cardSummary";

export const Summary = () => {
  const [arraySummary, setArraySummary] = useState([]);

  const [stateLoading, setStateLoading] = useState(false);

  const getColor = (value, red, yellow, green) => {
    if (value >= 1 && value <= red) return "bg-red-500"; // rojo
    if (value > red && value <= red + yellow) return "bg-yellow-500"; // amarillo
    if (value > red + yellow && value <= red + yellow + green)
      return "bg-green-500"; // verde
    if (value === 0) return "bg-black"; // negro
    if (value > red + yellow + green) return "bg-blue-500"; // azul
  };

  const generarResumenColores = (data) => {
    // datos de respuesta
    var resumen = [
      { color: "bg-red-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-yellow-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-green-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-black", cantidad: 0, porcentaje: "0%" },
      { color: "bg-blue-500", cantidad: 0, porcentaje: "0%" },
    ];

    //  total de elementos
    var total = data.length;

    // recorremos datos para asignar colores
    for (var i = 0; i < data.length; i++) {
      var dato = data[i];
      var value = dato.NetFlow + dato.MakeToOrder; // Suma de NetFlow y MakeToOrder
      var color = getColor(
        value,
        dato.RedZone,
        dato.YellowZone,
        dato.GreenZone
      ); // Asigna el color según el valor

      // Incrementa la cantidad para el color correspondiente en el resumen
      for (var j = 0; j < resumen.length; j++) {
        if (resumen[j].color === color) {
          resumen[j].cantidad++;
          break;
        }
      }
    }

    // Calcula los porcentajes para cada color en el resumen
    for (var k = 0; k < resumen.length; k++) {
      var cantidad = resumen[k].cantidad;
      var porcentaje = (cantidad / total) * 100;
      resumen[k].porcentaje = porcentaje.toFixed(2) + "%"; // Asigna el porcentaje
    }

    return resumen;
  };

  const getInf = () => {
    setStateLoading(true);
    getList().then((resp) => {
      const objResp = generarResumenColores(resp.Datos);
      setArraySummary(objResp);
      let count = 0;
      objResp.map((item) => {
        count = count + item.cantidad;
      });
      console.log(objResp);
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
