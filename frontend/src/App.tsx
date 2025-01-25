import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccessDenied from "./pages/AccessDenied";
import DrawScreen from "./pages/DrawScreen";
import UploadCompanies from "./pages/UploadCompanies";
import { LinksEnum } from "./lib/link";
import Home from "./pages/Home";
import CompanyDraw from "./pages/CompanyDraw";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const App = () => {
	return (
		<Theme>
		<BrowserRouter>
			<Routes>
				<Route path={LinksEnum.HOME} element={<Home />} />
				<Route path={LinksEnum.ACCESS_DENIED} element={<AccessDenied />} />
				<Route path={LinksEnum.COMPANY_DRAW} element={<CompanyDraw />} />
				<Route
					path={LinksEnum.DRAW_SCREEN}
					element={<DrawScreen />}
				/>
				<Route
					path={LinksEnum.UPLOAD_COMPANIES}
					element={<UploadCompanies />}
				/>
			</Routes>
		</BrowserRouter>
		</Theme>
	);
};

export default App;
