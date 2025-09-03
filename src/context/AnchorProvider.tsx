import { useMemo, useRef } from "react";

import type { AnchorMap, ChildrenType } from "@/types";
import { AnchorCtx } from "./anchor-context";

const AnchorProvider = ({ children }: ChildrenType) => {
	const anchorMapRef = useRef<AnchorMap>(new Map());
	const value = useMemo(() => anchorMapRef?.current, []);

	return <AnchorCtx value={value}>{children}</AnchorCtx>;
};

export default AnchorProvider;
