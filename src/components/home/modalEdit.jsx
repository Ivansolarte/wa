import { useEffect, useState } from "react";
import { Modal } from "../../elements/modal/modal";
import { InputClassic } from "../../elements/input/inputClassic";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { updateMakeToOrder } from "../../service/home.service";

export const ModalEdit = ({ obj, update, openModal }) => {
  const [value, setValue] = useState("");

  const onsubmit = () => {
    // enviando al servicio para editar el valor de MakeToOrder
    updateMakeToOrder(obj, Number(value)).then((resp) => {
      if (resp) {
        update(); //actualizo la tabla 
        openModal(false);
      }
    });
  };

  useEffect(() => {
    if (obj) {
      setValue(obj.MakeToOrder);
    }
    return () => {};
  }, []);

  return (
    <Modal>
      <div className="m-4 p-4 w-[450px]">
        <div className="flex justify-end">
          <p
            className="text-xl w-8 h-8 text-center rounded-full border border-black"
            onClick={() => openModal(false)}
          >
            x
          </p>
        </div>
        <div className="text-center">
          <p className="uppercase mb-4 font-semibold">
            Editando valor  
          </p>
          {/* /// ayuda para ver las celdas algo de ayuda */}
          <div className="text-start">
            <p>
            "NetFlow" = {JSON.stringify(obj.NetFlow)}
            </p>
            {/* <p
              className={`uppercase text-xs ${
                1 <= obj.NetFlow + obj.MakeToOrder &&
                obj.NetFlow + obj.MakeToOrder <= obj.RedZone
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              Rojo
            </p>
            <p
              className={`uppercase text-xs ${
                obj.NetFlow + obj.MakeToOrder > obj.RedZone &&
                obj.NetFlow + obj.MakeToOrder <= obj.YellowZone + obj.RedZone
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              Amrrillo
            </p>
            <p
              className={`uppercase text-xs ${
                obj.NetFlow + obj.MakeToOrder > obj.RedZone + obj.YellowZone &&
                obj.NetFlow + obj.MakeToOrder <=
                  obj.GreenZone + obj.YellowZone + obj.RedZone
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              verder
            </p>
            <p
              className={`uppercase text-xs ${
                obj.NetFlow + obj.MakeToOrder === 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              negro
            </p>
            <p
              className={`uppercase text-xs ${
                obj.NetFlow + obj.MakeToOrder >
                obj.GreenZone + obj.YellowZone + obj.RedZone
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              azul
            </p> */}
          </div>
          {/* //la ayuda de colores */}
        </div>
        <div className="my-9">
          <p></p>
          <InputClassic
            placeholder={"MakeToOrder"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <div>
          <ButtonClassic title={"enviar"} onClick={onsubmit} />
        </div>
      </div>
    </Modal>
  );
};
