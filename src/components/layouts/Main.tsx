import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";

import { cl } from "../../utils/utils";
import ScrollToAnchor from "../ScrollToAnchor";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const App = () => {
	const mainRef = useRef<HTMLElement | null>(null);
	const location = useLocation();
	const isHome = location.pathname === "/";

	useEffect(() => {
		const el = mainRef.current;
		if (!el) return;

		const id = requestAnimationFrame(() => {
			el.focus({ preventScroll: true });
		});

		return () => cancelAnimationFrame(id);
	}, [location.pathname]);

	return (
		<div className="custom-background col-items-center min-h-screen justify-between gap-y-7.5">
			<ScrollToAnchor />
			<Header isHome={isHome} />
			<main
				id="main"
				ref={mainRef}
				tabIndex={-1}
				className={cl("col-items-center w-full px-5 outline-none sm:container sm:px-10", isHome ? "gap-y-15" : "")}
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
