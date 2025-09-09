import { Outlet } from "react-router";

import ScrollToAnchor from "./components/ScrollToAnchor";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";

const App = () => {
	return (
		<div className="custom-background flex min-h-screen flex-col items-center gap-y-7.5">
			<Header />
			<Outlet />
			<ScrollToAnchor />
			<Footer />
		</div>
	);
};

export default App;
