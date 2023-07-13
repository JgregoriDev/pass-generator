import Style from "@/SASS/index.module.scss";
import { Page } from "./pages/Page";
function App() {
  return (
    <div className={Style.main}>
     <Page />
    </div>
  );
}

export default App;
