import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router";

import type { HeaderType } from "@/types";
import { cl, imageMap } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const navlinks = [
	{
		name: "header.nav.macrame",
		href: "#macrame",
		backURL: "/#macrame",
	},
	{
		name: "header.nav.about",
		href: "#about",
		backURL: "/#about",
	},
	{
		name: "header.nav.products",
		href: "#products",
		backURL: "/#products",
	},
	{
		name: "header.nav.contact",
		href: "#contact",
		backURL: "/#contact",
	},
];

const Header = ({ isHome }: HeaderType) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuBtnRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const { pathname } = useLocation();

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
	}, [isMenuOpen]);

	const handleMenuToggle = (e: MouseEvent) => {
		e.stopPropagation();
		menuBtnRef.current?.classList.toggle("open");
		menuBtnRef.current?.classList.toggle("top-3");
		menuBtnRef.current?.classList.toggle("top-2");
		menuRef.current?.classList.toggle("hidden");
		menuRef.current?.classList.toggle("flex");
		setIsMenuOpen(!isMenuOpen);
	};

	const decideGoBack = () => {
		if (!pathname.includes("categories")) {
			return "/";
		}

		return "/#products";
	};

	return (
		<header className="bg-burgundy sticky top-0 z-20 flex h-28 w-full items-center justify-between px-5 py-5 sm:h-17 sm:px-10">
			<div className="flex-1">
				<Link
					to="/"
					className="flex h-15 w-15 items-center justify-center rounded-full bg-white hover:cursor-pointer sm:h-13 sm:w-13"
				>
					<img src={imageMap.logo} alt="website-logo" className="h-9.5 sm:h-8.5" aria-hidden />
				</Link>
			</div>
			<h1 className="flex-1 text-center text-base font-bold text-white lg:block lg:text-2xl">
				{t("header.site_title")}
			</h1>
			<nav className="flex flex-1 justify-end gap-x-2 md:gap-x-0">
				{isHome ? (
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link
									to={link.href}
									className="p-2 text-white transition hover:font-bold hover:underline hover:underline-offset-4 active:font-bold active:underline active:underline-offset-4"
								>
									{t(link.name)}
								</Link>
							</li>
						))}
					</ul>
				) : (
					<Link
						to={decideGoBack()}
						className={cl(
							"items-center justify-center gap-1 p-2 text-white transition hover:font-bold",
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
						<span className="text-lg leading-none">{t("header.nav.back")}</span>
					</Link>
				)}
				<LanguageSwitcher />
				<button
					ref={menuBtnRef}
					type="button"
					className="hamburger group top-3 z-40 hover:cursor-pointer focus:outline-none md:hidden"
					onClick={handleMenuToggle}
				>
					<span className="hamburger-top group-hover:bg-white"></span>
					<span className="hamburger-middle"></span>
					<span className="hamburger-bottom group-hover:bg-white"></span>
				</button>
			</nav>
			<div ref={menuRef} className="mobile-menu hidden" onClick={handleMenuToggle}>
				<nav className="w-full pt-30">
					<ul className="flex w-full flex-col items-center gap-y-7.5">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link to={isHome ? link.href : link.backURL} onClick={handleMenuToggle}>
									{t(link.name)}
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
