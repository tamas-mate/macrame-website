import { useTranslation } from "react-i18next";

const NotFound = () => {
	const { t } = useTranslation("backend");

	return <div className="flex h-screen items-center justify-center text-2xl">{t("not_found.description")}</div>;
};

export default NotFound;
