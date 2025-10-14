import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import DashboardLayout from "./components/layouts/Dashboard.tsx";
import MainLayout from "./components/layouts/Main.tsx";
import NotFound from "./components/not-found/NotFound.tsx";
import CatalogManager from "./components/pages/CatalogManager.tsx";
import Category from "./components/pages/Category.tsx";
import Home from "./components/pages/Home.tsx";
import HomeEditor from "./components/pages/HomeEditor.tsx";
import "./i18n";
import "./index.css";
import { toastContainerConfig } from "./utils/utils.ts";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			retryDelay: 1000,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			gcTime: 60 * 60 * 1000,
		},
	},
});

const LazyToastContainer = lazy(() => import("react-toastify").then((module) => ({ default: module.ToastContainer })));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/categories/:category" element={<Category />} />
					</Route>
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route index element={<HomeEditor />} />
						<Route path="/dashboard/catalog" element={<CatalogManager />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Suspense fallback={null}>
				<LazyToastContainer {...toastContainerConfig} />
			</Suspense>
		</QueryClientProvider>
	</StrictMode>,
);
