import { useDbTranslations } from "@/hooks/useDbTranslations";
import About from "../sections/about/About";
import Macrame from "../sections/macrame/Macrame";
import Products from "../sections/products/Products";

const Home = () => {
	const { t } = useDbTranslations();

	return (
		<>
			<h1 className="sr-only">{t("home.aria_home")}</h1>
			<Macrame />
			<About />
			<Products />
		</>
	);
};

export default Home;
