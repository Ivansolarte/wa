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

  const arregloArray = (data) => {
    const resultado = [];
    // recorre todos los elementos dentro de data.Datos
    for (let i = 0; i < data.Datos.length; i++) {
      const item = data.Datos[i]; // Obtenemos el elemento actual

      //extraemos las propiedades p
      const { Reference, CenterCode } = item;

      //buscamos si ya existe un grupo con este Reference y CenterCode en el arreglo resultado
      let grupo = resultado.find(
        (obj) => obj.Reference === Reference && obj.CenterCode === CenterCode
      );

      // si no existe el grupo, lo creamos y lo agregamos al arreglo resultado
      if (!grupo) {
        grupo = {
          Reference: Reference, // Asignamos el valor de Reference
          CenterCode: CenterCode, // Asignamos el valor de CenterCode
          Data: [], // Creamos un arreglo vacío para guardar los items de ese grupo
        };
        resultado.push(grupo); // Agregamos el nuevo grupo al arreglo resultado
      }

      //agregamos el item "los obj con los datos" actual al arreglo "Data" del grupo correspondiente
      grupo.Data.push(item);
    }

    return resultado;
  };

  const getInfTable = () => {
    setStateLoading(true);
    //consulto los datos a una "api"
    getList().then((resp) => {
      const newArray = arregloArray(resp);
      setArray(newArray);
      setStateLoading(false);
    });
  };

  const openModalEdit = (e) => {
    setObjRow(e);
    setOpenModal(true);
  };

  useEffect(() => {
    getInfTable();
    return () => {};
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
