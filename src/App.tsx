import { Outlet } from "react-router";

import ScrollToAnchor from "./components/ScrollToAnchor";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";

const App = () => {
	return (
		<>
			<Header />
			<Outlet />
			<ScrollToAnchor />
			<Footer />
		</>
	);
};

export default App;

