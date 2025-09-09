import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./App.tsx";
import Category from "./components/pages/Category.tsx";
import Home from "./components/pages/Home.tsx";
import AnchorProvider from "./context/AnchorProvider.tsx";
import "./index.css";
import { toastContainerConfig } from "./utils/utils.ts";

const LazyToastContainer = lazy(() => import("react-toastify").then((module) => ({ default: module.ToastContainer })));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AnchorProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/category/:category" element={<Category />} />
						<Route path="*" element={<div>404 Not Found</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Suspense fallback={null}>
				<LazyToastContainer {...toastContainerConfig} />
			</Suspense>
		</AnchorProvider>
	</StrictMode>,
);
