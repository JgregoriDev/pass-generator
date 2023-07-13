import { Children } from "react";
import Style from "./Button.module.scss";
export const Button = ({ titleValue, classValue, onClick, children }) => {
  const className = `${Style.btn} ${Style[classValue]}`;
  return (
    <>
      <button
        title={""}
        className={className}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  );
};
