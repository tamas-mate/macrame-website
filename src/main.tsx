import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./App.tsx";
import Category from "./components/pages/Category.tsx";
import Home from "./components/pages/Home.tsx";
import "./i18n";
import "./index.css";
import { toastContainerConfig } from "./utils/utils.ts";

const LazyToastContainer = lazy(() => import("react-toastify").then((module) => ({ default: module.ToastContainer })));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/categories/:category" element={<Category />} />
					<Route path="*" element={<div>404 Not Found</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
		<Suspense fallback={null}>
			<LazyToastContainer {...toastContainerConfig} />
		</Suspense>
	</StrictMode>,
);
