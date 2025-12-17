import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationHU from "./locales/hu.json";
import translationRO from "./locales/ro.json";

void i18n.use(initReactI18next).init({
	debug: import.meta.env.MODE === "development",
	lng: localStorage.getItem("i18nextLng") ?? "hu",
	fallbackNS: "translation",
	resources: {
		hu: {
			translation: translationHU,
		},
		ro: {
			translation: translationRO,
		},
		en: {
			translation: translationEN,
		},
	},
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
