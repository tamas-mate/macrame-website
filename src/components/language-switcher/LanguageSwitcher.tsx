import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import LocalizationIcon from "@/assets/icons/LocalizationIcon";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const handleLanguageChange = useCallback(
		async (lang: string) => {
			await i18n.changeLanguage(lang).then(() => {
				localStorage.setItem("i18nextLng", lang);
			});
		},
		[i18n],
	);

	return (
		<div className="group flex items-center justify-center">
			<LocalizationIcon />
			<select
				defaultValue={i18n.language}
				name="language"
				className="text-white outline-none group-hover:cursor-pointer group-hover:font-bold"
				onChange={(e) => handleLanguageChange(e.target.value)}
			>
				<option value="hu" className="bg-burgundy">
					HU
				</option>
				<option value="ro" className="bg-burgundy">
					RO
				</option>
				<option value="en" className="bg-burgundy">
					EN
				</option>
			</select>
		</div>
	);
};

export default LanguageSwitcher;
