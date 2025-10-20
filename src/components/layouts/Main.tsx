import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router";

import { useRemoteTranslations } from "../../hooks/useRemoteTranslations";
import { cl } from "../../utils/utils";
import ScrollToAnchor from "../ScrollToAnchor";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const App = () => {
	const mainRef = useRef<HTMLElement | null>(null);
	const location = useLocation();
	const { t } = useTranslation();
	const isHome = location.pathname === "/";
	useRemoteTranslations();

	useEffect(() => {
		const el = mainRef.current;

		if (!el) return;

		const id = requestAnimationFrame(() => {
			el.focus({ preventScroll: true });
		});

		return () => cancelAnimationFrame(id);
	}, [location.pathname]);

	return (
		<div className="custom-background flex min-h-screen flex-col items-center justify-between gap-y-7.5">
			<a href="#main" className="sr-only font-bold outline-none focus:not-sr-only">
				{t("skip_to_content")}
			</a>
			<ScrollToAnchor />
			<Header isHome={isHome} />
			<main
				id="main"
				tabIndex={-1}
				className={cl(
					"flex w-full flex-col items-center px-5 outline-none sm:container sm:px-10",
					isHome ? "gap-y-15" : "",
				)}
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
