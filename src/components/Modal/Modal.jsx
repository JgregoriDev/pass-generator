import { Button } from "@/components/Button/Button";
import { useRef, useEffect, useState } from "react";
import Style from "./Modal.module.scss";
import {
  lowercaseLetters,
  uppercaseLetters,
  numbersArray,
  symbolsArray,
} from "@/constants";
import { showMissageInDevelopmentEnvironment } from "@/utilities/utilities";

const All = {
  0: { array: lowercaseLetters, length: lowercaseLetters.length },
  1: { array: uppercaseLetters, length: uppercaseLetters.length },
  2: { array: numbersArray, length: numbersArray.length },
  3: { array: symbolsArray, length: symbolsArray.length },
};
const randomArray = (number) => {
  return All[number];
};
export const Modal = ({ max }) => {
  const ref = useRef(null);
  const [arrayValue, setArrayValue] = useState([]);
  // const [max, setMax] = useState(0);

  const chargeMax = () => {
    const aux = [];
    ref.current.value = "";

    for (let index = 0; index < 100; index++) {
      const { array, length } = randomArray(Math.floor(Math.random() * 3));
      const letter = array.at(Math.floor(Math.random() * length));
      aux.push(letter);
    }
    setArrayValue(aux);
    ref.current.value = aux.join("").substring(0, max);
  };

  useEffect(() => {
    chargeMax();
    showMissageInDevelopmentEnvironment(`Valor de ${ref.current.value}`);
  }, []);

  const getStringMaxLength = () => {
    return arrayValue.join("").substring(0, max);
  }
  useEffect(() => {
    ref.current.value = getStringMaxLength();
    // ref.style.border="1px solid royalblue";
  }, [max]);

  const clipboardPaste = () => {
    navigator.clipboard.writeText(ref.current.value);
  };
  return (
    <section className={Style.modal}>
      <div
        className={`${Style.modal__container} ${Style["modal__container--80"]}`}
      >
        <input className={Style.modal__input} type="text" ref={ref} />
      </div>
      <div
        className={`${Style.modal__container} ${Style["modal__container--20"]}`}
      >
        <Button
          titleValue={"Copiar Texto"}
          onClick={() => clipboardPaste()}
          classValue={"btn__copy"}
        >
          <ion-icon title="Copiar texto" name="clipboard-outline"></ion-icon>
        </Button>
        <Button
          titleValue={"Click"}
          classValue={"btn__update"}
          onClick={() => chargeMax()}
        >
          <ion-icon
            title="Actualizar Contraseña"
            name="refresh-outline"
          ></ion-icon>
        </Button>
      </div>
    </section>
  );
};
