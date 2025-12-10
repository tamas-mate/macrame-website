import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import { ContactUs } from "../contact/ContactUs";

const Footer = () => {
	const { t } = useDbTranslations();

	return (
		<footer
			id="contact"
			tabIndex={-1}
			className="bg-ghost-gray border-light-beige flex w-full flex-col items-center gap-y-7.5 border-t-2 border-solid pt-7.5 text-white"
		>
			<ContactUs />
			<div className="bg-burgundy flex w-full flex-col items-center gap-y-5 py-5 sm:flex-row sm:justify-center sm:gap-x-5 sm:gap-y-0">
				<small className="sm:border-r sm:border-white sm:pr-5">
					&copy; {new Date().getFullYear()} Máté Ilona {t("contact_footer.copyright")}
				</small>
				<nav aria-label={t("contact_footer.aria-social")}>
					<ul className="flex items-center gap-x-5">
						<li>
							<a
								href="https://www.facebook.com/ilona.mate.3"
								target="_blank"
								rel="noopener noreferrer"
								className="group"
								aria-label="Facebook"
							>
								<FacebookIcon />
							</a>
						</li>
						<li>
							<a
								href="https://www.instagram.com/minimakrame/"
								target="_blank"
								rel="noopener noreferrer"
								className="group"
								aria-label="Instagram"
							>
								<InstagramIcon />
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
