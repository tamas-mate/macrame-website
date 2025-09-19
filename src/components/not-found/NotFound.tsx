import { useTranslation } from "react-i18next";

const NotFound = () => {
	const { t } = useTranslation();

	return <div className="text-2xl">{t("not_found.description")}</div>;
};

export default NotFound;
