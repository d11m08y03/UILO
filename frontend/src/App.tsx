import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccessDenied from "./pages/AccessDenied";
import UploadCompanies from "./pages/UploadCompanies";
import { LinksEnum } from "./lib/link";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinksEnum.HOME} element={<Home />} />
        <Route path={LinksEnum.ACCESS_DENIED} element={<AccessDenied />} />
        <Route
          path={LinksEnum.UPLOAD_COMPANIES}
          element={<UploadCompanies />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
