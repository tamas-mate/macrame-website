import { useAnchor } from "@/context/anchor-context";
import { ContactUs } from "../ContactUs";

const Footer = () => {
	const ref = useAnchor("contact");

	return (
		<footer
			ref={ref}
			id="contact"
			className="bg-primary-dark flex w-full flex-col items-center gap-y-7.5 pt-7.5 text-white"
		>
			<ContactUs />
			<div className="flex w-full flex-col items-center gap-y-5 bg-black py-5 sm:flex-row sm:justify-center sm:gap-x-5">
				<p className="sm:border-r sm:border-white sm:pr-5">
					&copy; {new Date().getFullYear()} Máté Ilona All Rights Reserved
				</p>
				<div className="flex items-center gap-x-5">
					<a href="https://www.facebook.com/ilona.mate.3" target="_blank" className="group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="group-hover:fill-primary-dark size-6 fill-white"
							viewBox="0,0,256,256"
						>
							<g>
								<g transform="scale(10.66667,10.66667)">
									<path d="M12,2c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c5.511,0 10,-4.489 10,-10c0,-5.511 -4.489,-10 -10,-10zM12,4c4.43012,0 8,3.56988 8,8c0,4.01447 -2.93468,7.31302 -6.78125,7.89844v-5.51367h2.32813l0.36523,-2.36524h-2.69336v-1.29297c0,-0.983 0.32023,-1.85547 1.24023,-1.85547h1.47656v-2.06445c-0.26,-0.035 -0.8087,-0.11133 -1.8457,-0.11133c-2.166,0 -3.43555,1.144 -3.43555,3.75v1.57422h-2.22656v2.36524h2.22656v5.49414c-3.78401,-0.63806 -6.6543,-3.90867 -6.6543,-7.87891c0,-4.43012 3.56988,-8 8,-8z"></path>
								</g>
							</g>
						</svg>
					</a>
					<a href="https://www.instagram.com/minimakrame/" target="_blank" className="group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="group-hover:fill-primary-dark size-7 fill-white"
							viewBox="0,0,256,256"
						>
							<g>
								<g transform="scale(10.66667,10.66667)">
									<path d="M8,3c-2.757,0 -5,2.243 -5,5v8c0,2.757 2.243,5 5,5h8c2.757,0 5,-2.243 5,-5v-8c0,-2.757 -2.243,-5 -5,-5zM8,5h8c1.654,0 3,1.346 3,3v8c0,1.654 -1.346,3 -3,3h-8c-1.654,0 -3,-1.346 -3,-3v-8c0,-1.654 1.346,-3 3,-3zM17,6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,7c-2.757,0 -5,2.243 -5,5c0,2.757 2.243,5 5,5c2.757,0 5,-2.243 5,-5c0,-2.757 -2.243,-5 -5,-5zM12,9c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3z"></path>
								</g>
							</g>
						</svg>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
