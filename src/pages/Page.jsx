import { Modal } from "@/components/Modal/Modal";
import { useState, useRef } from "react";
import Style from "./Page.module.scss";
import { showMissageInDevelopmentEnvironment } from "../utilities/utilities";
const Values = {
  MIN: 6,
  MAX: 100,
};
const areCheckboxesChecked = {
  isMinChecked: false,
  isMayusChecked: false,
  isNumberChecked: false,
  isSymbolChecked: false,
};
export const Page = () => {
  const [max, setMax] = useState(30);
  const [checkboxStatus, setCheckboxStatus] = useState({
    isMinChecked: false,
    isMayusChecked: false,
    isNumberChecked: false,
    isSymbolChecked: false,
  });
  const ref = useRef(null);
  const handleSliderChange = (event) => {
    setMax(event.target.value);
    setTimeout(() => {
      if (event.target.value > Values.MAX) {
        setMax(Values.MAX);
        return;
      }

      if (event.target.value < Values.MIN) {
        setMax(Values.MIN);
        return;
      }
    }, 500);
  };

  const handleCheckboxChange = (evt) => {
    console.log(evt.target.id);
    if (evt.target.id === "min") {
      setCheckboxStatus({
        ...checkboxStatus,
        isMinChecked: !checkboxStatus.isMinChecked,
      });
    }
    if (evt.target.id === "mayus") {
      setCheckboxStatus({
        ...checkboxStatus,
        isMayusChecked: !checkboxStatus.isMayusChecked,
      });
    }
    if (evt.target.id === "num") {
      setCheckboxStatus({
        ...checkboxStatus,
        isNumberChecked: !checkboxStatus.isNumberChecked,
      });
    }
    if (evt.target.id === "sim") {
      setCheckboxStatus({
        ...checkboxStatus,
        isSymbolChecked: !checkboxStatus.isNumberChecked,
      });
    }
    console.log(checkboxStatus);
    showMissageInDevelopmentEnvironment(`Valor de ${areCheckboxesChecked}`);
  };
  return (
    <div className={Style.container}>
      <div className={Style.container__aside}></div>
      <main>
        <h1>Password generator</h1>
        <Modal max={max} />
        <div className={`${Style.container__page} ${Style["page"]}`}>
          <input
            className={Style.page__input}
            type="number"
            onChange={handleSliderChange}
            min="6"
            max="100"
            value={max}
          />
          <input
            className={Style.page__range}
            value={max}
            min="6"
            max="100"
            onChange={handleSliderChange}
            type="range"
          />
        </div>
        <div className={Style.container__checkboxes} ref={ref}>
          <div className={Style.container__checkbox}>
            <input
              id="min"
              value={checkboxStatus.isMinChecked}
              onChange={(evt) => handleCheckboxChange(evt)}
              type="checkbox"
              name=""
            />
            <label htmlFor="min">Letras minusculas</label>
          </div>
          <div className={Style.container__checkbox}>
            <input
              id="mayus"
              value={checkboxStatus.isMayusChecked}
              onChange={(evt) => handleCheckboxChange(evt)}
              type="checkbox"
              name=""
            />
            <label htmlFor="mayus">Letras mayusculas</label>
          </div>
          <div className={Style.container__checkbox}>
            <input
              id="num"
              value={checkboxStatus.isNumberChecked}
              onChange={(evt) => handleCheckboxChange(evt)}
              type="checkbox"
              name=""
            />
            <label htmlFor="num">Numeros</label>
          </div>
          <div className={Style.container__checkbox}>
            <input
              id="sim"
              value={checkboxStatus.isMayusChecked}
              onChange={(evt) => handleCheckboxChange(evt)}
              type="checkbox"
              name=""
            />
            <label htmlFor="sim">Simbolos</label>
          </div>
        </div>
      </main>
      <div className={Style.container__aside}></div>
    </div>
  );
};
