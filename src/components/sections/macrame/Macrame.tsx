import { featuredImages } from "@/data/gallery";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import ImageCarousel from "./ImageCarousel";

const Macrame = () => {
	const { t } = useDbTranslations();

	return (
		<section id="macrame" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">{t("home.macrame_intro.title")}</h2>
			<div className="flex flex-col justify-between gap-y-7.5 lg:flex-row lg:gap-x-7.5 lg:gap-y-0">
				<ImageCarousel featuredImages={featuredImages} />
				<div className="flex flex-col gap-y-3 text-pretty lg:order-1 lg:w-7/12 2xl:w-7/10">
					<p>{t("home.macrame_intro.body.p1")}</p>
					<p>{t("home.macrame_intro.body.p2")}</p>
					<p>{t("home.macrame_intro.body.p3")}</p>
				</div>
			</div>
		</section>
	);
};

export default Macrame;
