import { useState, useEffect } from "react";
import { ModalEdit } from "../components/home/modalEdit";
import { getList } from "../service/home.service";
import { TableComponent } from "../elements/table/tableComponent";
import { Loading } from "../components/modals/loading";

export const Dashboard = () => {
  const [array, setArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [objRow, setObjRow] = useState({});
  const [stateLoading, setStateLoading] = useState(false);

  /**
   * Agrupa los elementos por 'Reference' y 'CenterCode'.
   */
  const arregloArray = (data) => {
    const resultado = [];

    for (let i = 0; i < data.Datos.length; i++) {
      const item = data.Datos[i];
      const { Reference, CenterCode } = item;

      let grupo = resultado.find(
        (obj) => obj.Reference === Reference && obj.CenterCode === CenterCode
      );

      if (!grupo) {
        grupo = {
          Reference,
          CenterCode,
          Data: [],
        };
        resultado.push(grupo);
      }

      grupo.Data.push(item);
    }

    return resultado;
  };

  /**
   * Consulta la API y actualiza el estado con los datos agrupados.
   */
  const getInfTable = () => {
    setStateLoading(true);
    getList().then((resp) => {
      const newArray = arregloArray(resp);
      setArray(newArray);
      setStateLoading(false);
    });
  };

  /**
   * Establece el objeto seleccionado y abre el modal.
   */
  const openModalEdit = (e) => {
    setObjRow(e);
    setOpenModal(true);
  };

  useEffect(() => {
    getInfTable();
  }, []);

  return (
    <div className="md:mx-5 md:my-2">
      {array.length > 0 && (
        <TableComponent data={array} openModal={openModalEdit} />
      )}
      {openModal && (
        <ModalEdit obj={objRow} update={getInfTable} openModal={setOpenModal} />
      )}
      {stateLoading && <Loading />}
    </div>
  );
};
