import { menuRoutes } from "./routes.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {menuRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
