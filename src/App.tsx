import { Outlet, useLocation } from "react-router";

import { useEffect, useState } from "react";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useRemoteTranslations } from "./hooks/useRemoteTranslations";
import { cl } from "./utils/utils";

const App = () => {
	const [isHome, setIsHome] = useState(true);
	const location = useLocation();
	const { loading } = useRemoteTranslations();

	useEffect(() => {
		setIsHome(location.pathname === "/");
	}, [location]);

	if (loading) return <LoadingSpinner />;

	return (
		<div className="custom-background flex min-h-screen flex-col items-center justify-between gap-y-7.5">
			<ScrollToAnchor />
			<Header isHome={isHome} />
			<main className={cl("flex w-full flex-col items-center px-5 sm:container sm:px-10", isHome ? "gap-y-15" : "")}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
