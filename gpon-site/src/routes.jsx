import { BusinessPage } from "./pages/businesspage/BusinessPage.jsx";
import { Medium } from "./pages/medium/Medium.jsx";
import  Mapa  from "./pages/map/Mapa.jsx";
import { Input } from "./pages/input/Input.jsx";

const menuRoutes = [
  { path: "/", element: <Medium /> },
  { path: "/map", element: <Mapa /> },
  { path: "/input", element: <Input /> },
  { path: "/business", element: <BusinessPage /> },
];
export { menuRoutes };
