import { useAnchor } from "@/context/anchor-context";
import { ContactUs } from "../ContactUs";

const Footer = () => {
	const ref = useAnchor("footer");

	return (
		<footer
			ref={ref}
			id="footer"
			className="bg-primary-dark flex w-full flex-col items-center justify-center gap-10 p-10 text-white md:flex-row"
		>
			<ContactUs />
			<div className="flex h-full w-full flex-col items-center justify-center md:w-auto md:justify-start">
				<p>Contacts</p>
				<p>07123456789</p>
				<p>loremipsum@gmail.com</p>
			</div>
		</footer>
	);
};

export default Footer;
