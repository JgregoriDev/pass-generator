export const showMissageInDevelopmentEnvironment = ({...missatge}) => {
    
  if (import.meta.env.VITE_STATUS_PROJECT === "Development") {
    console.log(missatge);
  }
};
