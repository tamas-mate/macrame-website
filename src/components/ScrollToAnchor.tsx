import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ScrollToAnchor = () => {
	const { pathname, hash } = useLocation();
	const prevPathname = useRef<string | null>(null);

	useEffect(() => {
		if (!hash) {
			prevPathname.current = pathname;
			return;
		}

		const el = document.getElementById(hash.slice(1));

		if (el) {
			setTimeout(() => {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 250);
		}

		prevPathname.current = pathname;
	}, [pathname, hash]);

	return null;
};

export default ScrollToAnchor;
