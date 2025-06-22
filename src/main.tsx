import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./App.tsx";
import Category from "./components/Category.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/category/:category" element={<Category />} />
				<Route path="*" element={<div>404 Not Found</div>} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
