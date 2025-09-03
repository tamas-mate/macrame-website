import { createContext, useContext, useRef } from "react";

import type { AnchorMap } from "@/types";

export const AnchorCtx = createContext<AnchorMap | undefined>(undefined);

export const useAnchor = (id: string) => {
	const anchorMap = useContext(AnchorCtx);

	if (!anchorMap) throw new Error("useAnchor must be used within a AnchorProvider");

	const ref = useRef<HTMLElement | null>(null);

	if (!anchorMap.has(id)) anchorMap.set(id, ref);

	return ref;
};

export const useGetAnchorRef = () => {
	const anchorMap = useContext(AnchorCtx);

	if (!anchorMap) throw new Error("useGetAnchorRef must be used within a AnchorProvider");

	return (id: string) => {
		const ref = anchorMap.get(id);

		if (ref && "current" in ref) {
			return ref.current;
		}

		return null;
	};
};
