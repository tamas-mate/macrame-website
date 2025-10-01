import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./App.tsx";
import NotFound from "./components/not-found/NotFound.tsx";
import Category from "./components/pages/Category.tsx";
import Home from "./components/pages/Home.tsx";
import "./i18n";
import "./index.css";
import { toastContainerConfig } from "./utils/utils.ts";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			retryDelay: 1000,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
	},
});

const LazyToastContainer = lazy(() => import("react-toastify").then((module) => ({ default: module.ToastContainer })));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/categories/:category" element={<Category />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Suspense fallback={null}>
				<LazyToastContainer {...toastContainerConfig} />
			</Suspense>
		</QueryClientProvider>
	</StrictMode>,
);
