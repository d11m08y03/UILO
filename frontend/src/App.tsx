import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccessDenied from "./pages/AccessDenied";
import UploadCompanies from "./pages/UploadCompanies";
import { LinksEnum } from "./lib/link";
import Test from "./pages/Test";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinksEnum.HOME} element={<Test />} />
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
