import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router";

import type { HeaderType } from "@/types";
import { cl, imageMap } from "@/utils/utils";

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
		href: "#contact",
		backURL: "/#contact",
	},
];

const Header = ({ isHome }: HeaderType) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuBtnRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	const handleMenuToggle = (e: MouseEvent) => {
		e.stopPropagation();
		menuBtnRef.current?.classList.toggle("open");
		menuBtnRef.current?.classList.toggle("top-1");
		menuRef.current?.classList.toggle("hidden");
		menuRef.current?.classList.toggle("flex");
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="sticky top-0 z-20 flex h-28 w-full items-center justify-between bg-black px-5 py-5 sm:h-17 sm:px-10">
			<div className="flex-1">
				<Link
					to="/"
					className="flex h-15 w-15 items-center justify-center rounded-full bg-white hover:cursor-pointer sm:h-13 sm:w-13"
				>
					<img src={imageMap.logo} alt="website-logo" className="h-9.5 sm:h-8.5" />
				</Link>
			</div>
			<h1 className="flex-1 text-center text-base font-bold text-white lg:block lg:text-2xl">Máté Ilona Macramé</h1>
			<nav className="flex flex-1 justify-end gap-x-4">
				{isHome ? (
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link
									to={link.href}
									className="hover:text-primary-dark p-2 text-white underline-offset-4 transition hover:underline"
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				) : (
					<Link
						to="/#products"
						className={cl(
							"hover:text-primary-dark items-center justify-center gap-1 p-2 text-white transition",
							!isHome && "hidden md:flex",
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
					className="hamburger group top-1 z-40 hover:cursor-pointer focus:outline-none md:hidden"
					onClick={handleMenuToggle}
				>
					<span className="hamburger-top group-hover:bg-white"></span>
					<span className="hamburger-middle"></span>
					<span className="hamburger-bottom group-hover:bg-white"></span>
				</button>
			</nav>
			<div ref={menuRef} className="mobile-menu hidden" onClick={handleMenuToggle}>
				<nav className="w-full pt-30">
					<ul className="flex w-full flex-col items-center gap-y-10">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link to={isHome ? link.href : link.backURL} onClick={handleMenuToggle}>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
