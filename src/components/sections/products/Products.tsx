import { categories } from "@/constants";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import ProductCategories from "./ProductCategories";

const Products = () => {
	const { t } = useDbTranslations();

	return (
		<section id="products" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">{t("home.collection_overview.title")}</h2>
			<p className="text-pretty">{t("home.collection_overview.intro")}</p>
			<ul className="flex list-disc flex-col gap-y-3 pl-5 text-pretty sm:pl-10">
				<li className="text-pretty">{t("home.collection_overview.category_list.earrings.description")}</li>
				<li className="text-pretty">{t("home.collection_overview.category_list.necklaces.description")}</li>
				<li className="text-pretty">{t("home.collection_overview.category_list.bracelets.description")}</li>
				<li className="text-pretty">{t("home.collection_overview.category_list.rings.description")}</li>
				<li className="text-pretty">{t("home.collection_overview.category_list.decorations.description")}</li>
				<li className="text-pretty">{t("home.collection_overview.category_list.sets.description")}</li>
			</ul>
			<p className="text-pretty">{t("home.collection_overview.outro")}</p>
			<ProductCategories categories={categories} />
		</section>
	);
};

export default Products;
