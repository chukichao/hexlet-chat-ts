import { BrowserRouter } from "react-router-dom";
import "../assets/application.scss";
import AppRouter from "./AppRouter.jsx";

const App: React.FC = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default App;
