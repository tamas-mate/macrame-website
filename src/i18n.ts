import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/src/i18n/en.json";
import translationHU from "./locales/src/i18n/hu.json";
import translationRO from "./locales/src/i18n/ro.json";

void i18n.use(initReactI18next).init({
	debug: import.meta.env.MODE === "development",
	lng: localStorage.getItem("i18nextLng") ?? "hu",
	interpolation: {
		escapeValue: false,
	},
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
});

export default i18n;
