import { Button } from "@/components/Button/Button";
import { useRef, useEffect, useState } from "react";
import Style from "./Modal.module.scss";
import {
  lowercaseLetters,
  uppercaseLetters,
  numbersArray,
  symbolsArray,
} from "@/constants";

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
  // const ref = useRef(null);
  const [arrayValue, setArrayValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({status:"acceptable",message:""});
  // const [max, setMax] = useState(0);

  const chargeMax = async () => {
    const aux = [];
    // ref.current.value = "";

    for (let index = 0; index < 100; index++) {
      const { array, length } = randomArray(Math.floor(Math.random() * 4));
      const letter = array.at(Math.floor(Math.random() * length));
      aux.push(letter);
    }

    return aux;
    // ref.current.value = aux.join("").substring(0, max);
  };

  useEffect(() => {
    //He transformado en una promesa que ya que no devolvia el valor de manera correcta.
    chargeMax().then((password) => {
      setArrayValue(password);
      setInputValue(password.join("").substring(0, max - 1));
    });
    console.log(inputValue);
    // showMissageInDevelopmentEnvironment(`Valor de ${ref.current.value}`);
  }, []);

  const getStringMaxLength = () => {
    return arrayValue.join("").substring(0, max);
  };
  useEffect(() => {
    // ref.current.value = getStringMaxLength();
    setInputValue(getStringMaxLength());
    if(max<26)setPasswordStatus({status:"weak",message:"La seguridad de la contraseña es baja"});
    if(max>25 && max<51)setPasswordStatus({status:"acceptable",message:"La longitud de la contraseña es adecuado"});
    else if(max>50 && max<=100) setPasswordStatus({status:"strong",message:"La longitud de la contraseña es fuerte"});
    console.log(setInputValue);
    // ref.style.border="1px solid royalblue";
  }, [max]);

  const clipboardPaste = () => {
    navigator.clipboard.writeText(inputValue);
  };
  return (
    <>
    
    <section className={`${Style.modal}  ${Style[passwordStatus.status]}`}>
      <div
        className={`${Style.modal__container} ${Style["modal__container--80"]}`}
      >
        <input className={Style.modal__input} type="text" value={inputValue} />
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
    <small className={`${Style[passwordStatus.status]}`}>{passwordStatus.message}</small>
    </>
  );
};
