import { useTranslation } from "react-i18next";

import { imageMap } from "@/utils/utils";

const About = () => {
	const { t } = useTranslation();

	return (
		<section id="about" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">{t("home.meet_ilona.title")}</h2>
			<div className="flex flex-col gap-y-7.5 lg:flex-row lg:gap-x-7.5 lg:gap-y-0">
				<img
					src={imageMap["about"]}
					alt="Máté Ilona"
					className="msm:w-3/4 self-center rounded-lg sm:w-2/3 lg:h-76 lg:w-auto lg:self-auto"
				/>
				<div className="flex flex-col gap-y-3 text-pretty">
					<p>{t("home.meet_ilona.body.p1")}</p>
					<p>{t("home.meet_ilona.body.p2")}</p>
					<p>{t("home.meet_ilona.body.p3")}</p>
					<p>{t("home.meet_ilona.body.p4")}</p>
				</div>
			</div>
		</section>
	);
};

export default About;
