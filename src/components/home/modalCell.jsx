import React from "react";
import { Modal } from "../../elements/modal/modal";
import { CardSummary } from "./cardSummary";
import { ButtonClassic } from "../../elements/button/buttonClassic";

export const ModalCell = ({ data, state, close }) => {
  // modal para ver el resumen por celda
  return (
    <Modal>
      <div className="">
        <CardSummary arraySummary={data} stateLoading={state} />
        <div className="flex justify-center mb-10">
          <div className="w-1/2 ">
            <ButtonClassic title={"Cerrar"} onClick={() => close([])} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
