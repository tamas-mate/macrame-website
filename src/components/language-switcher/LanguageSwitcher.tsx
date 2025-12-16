import LocalizationIcon from "@/assets/icons/LocalizationIcon";
import { useDbTranslations } from "@/hooks/useDbTranslations";

const LanguageSwitcher = ({ bgColor }: { bgColor: string }) => {
	const { i18n } = useDbTranslations();

	const handleLanguageChange = async (lang: string) => {
		await i18n.changeLanguage(lang).then(() => {
			localStorage.setItem("i18nextLng", lang);
		});
	};

	return (
		<div className="flex items-center justify-center">
			<LocalizationIcon />
			<select
				defaultValue={i18n.language}
				name="language"
				className={`text-white outline-none hover:cursor-pointer hover:font-bold ${bgColor}`}
				onChange={(e) => handleLanguageChange(e.target.value)}
			>
				<option value="hu">HU</option>
				<option value="ro">RO</option>
				<option value="en">EN</option>
			</select>
		</div>
	);
};

export default LanguageSwitcher;
