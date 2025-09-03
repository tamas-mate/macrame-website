import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router";

import { cl } from "@/utils/utils";
import Logo from "../../assets/images/logo.png";

const navlinks = [
	{
		name: "Macrame",
		href: "#macrame",
		backURL: "/#macrame",
	},
	{
		name: "Artist",
		href: "#artist",
		backURL: "/#artist",
	},
	{
		name: "Products",
		href: "#products",
		backURL: "/#products",
	},
	{
		name: "Contact",
		href: "#footer",
		backURL: "/#footer",
	},
];

const Header = () => {
	const [isRoot, setIsRoot] = useState(true);
	const menuBtnRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	useEffect(() => {
		setIsRoot(location.pathname === "/");
	}, [location]);

	const handleMenuToggle = (e: MouseEvent) => {
		e.stopPropagation();
		menuBtnRef.current?.classList.toggle("open");
		menuRef.current?.classList.toggle("hidden");
		menuRef.current?.classList.toggle("flex");
	};

	return (
		<header className="h-header-height bg-primary-dark fixed top-0 left-0 z-10 flex w-full items-center justify-between px-20">
			<Link to="/" className="flex h-25 w-25 items-center justify-center rounded-full bg-white hover:cursor-pointer">
				<img src={Logo} alt="website-logo" className="h-12.5" />
			</Link>
			<nav className="flex items-center gap-x-4">
				{isRoot ? (
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navlinks.map((link) => (
							<li key={link.name}>
								<a
									href={link.href}
									className="hover: p-2 text-white underline-offset-4 transition hover:text-pink-300 hover:underline"
								>
									{link.name}
								</a>
							</li>
						))}
					</ul>
				) : (
					<Link
						to="/"
						className={cl(
							"items-center justify-center gap-1 p-2 text-white transition hover:text-pink-300",
							!isRoot && "hidden md:flex",
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="relative top-[1px] h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						<span className="text-lg leading-none">Go Back</span>
					</Link>
				)}
				<button
					ref={menuBtnRef}
					type="button"
					className="hamburger z-40 flex hover:cursor-pointer focus:outline-none md:hidden"
					onClick={handleMenuToggle}
				>
					<span className="hamburger-top"></span>
					<span className="hamburger-middle"></span>
					<span className="hamburger-bottom"></span>
				</button>
			</nav>
			<div ref={menuRef} className="mobile-menu hidden" onClick={handleMenuToggle}>
				<nav className="pt-10">
					<ul className="flex w-full flex-col items-center gap-y-10">
						{navlinks.map((link) => (
							<li key={link.name}>
								<a href={isRoot ? link.href : link.backURL} onClick={handleMenuToggle}>
									{link.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
