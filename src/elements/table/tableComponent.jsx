import { useState } from "react";
import { ModalCell } from "../../components/home/modalCell";
import { getColor } from "../../utils/funtions";

export const TableComponent = ({ data, openModal }) => {
  //   if (!Array.isArray(data) || data.length === 0) return null;

  const [stateLoading, setStateLoading] = useState(false);
  const [dataCell, setDataCell] = useState([]);

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
    <div className="container-table">
      <table className="table-main">
        <thead>
          <tr className="table-header-row">
            <th className="th-center-code">CenterCode</th>
            <th className="th-reference">Reference</th>
            {headers.map((fecha, index) => (
              <th
                key={index}
                className="th-date hover:animate-ping "
                onClick={() => columnSelect(fecha)}
              >
                {fecha}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="tr-body">
              <td className="td-center-code">{item.CenterCode}</td>
              <td className="td-reference">{item.Reference}</td>
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
                    className={`td-data cursor-pointer ${color}`}
                  >
                    <div className="cell-container">
                      <p className="cell-text" title={`Click para editar el valor de "${dato.MakeToOrder}"`}>{dato.MakeToOrder}</p>
                      <div className="cell-tooltip">
                        Click para editar el valor de "{dato.MakeToOrder}"
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
