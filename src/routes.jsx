import { BusinessPage } from "./pages/businesspage/BusinessPage.jsx";
import { Medium } from "./pages/medium/Medium.jsx";
import  Mapa  from "./pages/map/Mapa.jsx";
import { Input } from "./pages/input/Input.jsx";
import { Service } from "./pages/service/Service.jsx";
import { Payment } from "./pages/payment/Payment.jsx";
import { Documents } from "./pages/documents/Documents.jsx";
import Oblad from "./pages/oblad/Oblad.jsx";
import Devices from "./pages/devices/Devices.jsx";


const menuRoutes = [
  { path: "/", element: <Medium /> },
  { path: "/map", element: <Mapa /> },
  { path: "/input", element: <Input /> },
  { path: "/business", element: <BusinessPage /> },
  { path: "/services", element: <Service /> },
  { path: "/payment", element: <Payment /> },
  { path: "/documents", element: <Documents /> },
  { path: "/devices", element: <Devices /> },

];
export { menuRoutes };
