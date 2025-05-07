import { useState } from "react";
import { ModalCell } from "../../components/home/modalCell";

export const TableComponent = ({ data, openModal }) => {
  //   if (!Array.isArray(data) || data.length === 0) return null;

  const [stateLoading, setStateLoading] = useState(false);
  const [dataCell, setDataCell] = useState([]);

  const getColor = (value, red, yellow, green) => {
    if (value >= 1 && value <= red) return "bg-red-500"; // rojo
    if (value > red && value <= red + yellow) return "bg-yellow-500"; // amarillo
    if (value > red + yellow && value <= red + yellow + green)
      return "bg-green-500"; // verde
    if (value === 0) return "bg-black"; // negro
    if (value > red + yellow + green) return "bg-blue-500"; // azul
  };

  const formatFecha = (fechaCompleta) => {
    const partes = fechaCompleta.split("T")[0].split("-");
    return partes[1] + "/" + partes[2] + "/" + partes[0];
  };

  const headers = data[0].Data.map((item) =>
    formatFecha(item.VisibleForecastedDate)
  );

  const columnSelect = (e) => {
    setStateLoading(true);
    var resumen = [
      { color: "bg-red-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-yellow-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-green-500", cantidad: 0, porcentaje: "0%" },
      { color: "bg-black", cantidad: 0, porcentaje: "0%" },
      { color: "bg-blue-500", cantidad: 0, porcentaje: "0%" },
    ];

    const fecha = new Date(e);
    const buscarfecha = fecha.toISOString().split(".")[0];

    let arrayObj = [];
    //recorro la data para obtener los iguales a la fecha
    data.map((item) => {
      const resp = item.Data.filter(
        (obj) =>
          obj.VisibleForecastedDate.split("T")[0] == buscarfecha.split("T")[0]
      );
      resp.map((elem) => {
        arrayObj.push(elem);
      });
    });

    // calculamos cantidad por celda
    const total = arrayObj.length;
    arrayObj.map((item) => {
      const conteo = getColor(
        item.NetFlow + item.MakeToOrder,
        item.RedZone,
        item.YellowZone,
        item.GreenZone
      );
      for (var j = 0; j < resumen.length; j++) {
        if (resumen[j].color === conteo) {
          resumen[j].cantidad++;
          break;
        }
      }
    });

    // Calcula los porcentajes
    for (var k = 0; k < resumen.length; k++) {
      var cantidad = resumen[k].cantidad;
      var porcentaje = (cantidad / total) * 100;
      resumen[k].porcentaje = porcentaje.toFixed(2) + "%";
    }

    setDataCell(resumen);
    setStateLoading(false);
  };

  return (
    <div className="overflow-auto mt-5 border rounded-lg shadow-2xl">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 sticky top-0 ">
            <th className="border border-gray-300 p-1 sm:sticky left-0 bg-white sm:z-10 w-[100px]">
              CenterCode
            </th>
            <th className="border border-gray-300 p-1 sm:sticky left-[84px] bg-white sm:z-10 w-[200px]">
              Reference
            </th>
            {headers.map((fecha, index) => (
              <th
                key={index}
                className="border border-gray-300 p-1 cursor-pointer"
                onClick={() => columnSelect(fecha)}
              >
                {fecha}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white">
              <td className="border border-gray-300 p-1 text-center sm:sticky left-0 bg-white sm:z-30 w-[100px]">
                {item.CenterCode}
              </td>
              <td className="border border-gray-300 p-1 text-center sm:sticky left-[84px] bg-white sm:z-30 w-[200px]">
                {item.Reference}
              </td>
              {item.Data.map((dato, j) => {
                const color = getColor(
                  dato.NetFlow + dato.MakeToOrder,
                  dato.RedZone,
                  dato.YellowZone,
                  dato.GreenZone
                );
                return (
                  <td
                    key={j}
                    onClick={() => openModal(dato)}
                    className={`border border-gray-300 p-1 text-end font-bold text-white ${color}`}
                  >
                    <div className="group inline-block relative">
                      <p className="hover:animate-pulse focus:animate-pulse focus:text-lg">
                        {dato.MakeToOrder}
                      </p>
                      <div className="absolute border border-[3px] z-40 border-yellow-500 bottom-full right-0 mb-1 hidden w-max max-w-xs rounded bg-yellow-400 px-2 py-3 text-sm text-slate-50 group-hover:block cursor-pointer">
                        Dale doble clic para editar el valor de "
                        {dato.MakeToOrder}"
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {dataCell.length > 0 && (
        
        <ModalCell data={dataCell} state={stateLoading} close={setDataCell} />
      )}
    </div>
  );
};
