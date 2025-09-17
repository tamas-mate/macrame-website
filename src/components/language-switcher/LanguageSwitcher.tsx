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
				className="group-hover:text-primary-dark text-white outline-none group-hover:cursor-pointer"
				onChange={(e) => handleLanguageChange(e.target.value)}
			>
				<option value="hu" className="text-primary-dark bg-black">
					HU
				</option>
				<option value="ro" className="text-primary-dark bg-black">
					RO
				</option>
				<option value="en" className="text-primary-dark bg-black">
					EN
				</option>
			</select>
		</div>
	);
};

export default LanguageSwitcher;
