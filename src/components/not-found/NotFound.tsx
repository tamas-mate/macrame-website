import { useDbTranslations } from "@/hooks/useDbTranslations";

const NotFound = () => {
	const { t } = useDbTranslations();

	return <div className="flex h-screen items-center justify-center text-2xl">{t("not_found.description")}</div>;
};

export default NotFound;
