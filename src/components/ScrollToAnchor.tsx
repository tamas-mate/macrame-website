import { useEffect } from "react";
import { useLocation } from "react-router";

import { useGetAnchorRef } from "../context/anchor-context";

const ScrollToAnchor = () => {
	const { hash } = useLocation();
	const getRef = useGetAnchorRef();

	useEffect(() => {
		if (!hash) return;

		const id = hash.slice(1);
		const el = getRef(id);

		if (el) el.scrollIntoView({ behavior: "smooth" });
	}, [hash, getRef]);

	return null;
};

export default ScrollToAnchor;
