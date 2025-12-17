import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import { navlinks } from "@/constants";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import type { HeaderType } from "@/types";
import { cl, imageMap } from "@/utils/utils";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const Header = ({ isHome }: HeaderType) => {
	const { t } = useTranslation("backend");
	const { pathname, hash } = useLocation();
	const { isMenuOpen, toggleMenu, closeMenu, menuBtnRef, menuRef } = useMobileMenu();

	const handleBurgerClick = (e: MouseEvent) => {
		toggleMenu(e);
	};

	const handleMenuOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeMenu();
		}
	};

	const decideGoBack = () => (!pathname.includes("categories") ? "/" : "/#products");

	const isCurrentLink = (href: string) => pathname === "/" && hash === href;

	return (
		<header className="bg-burgundy sticky top-0 z-20 flex h-28 w-full items-center justify-between p-5 sm:h-17 sm:px-10">
			<div className="flex-1">
				<Link
					to="/"
					aria-label={t("home.aria_home")}
					className="flex size-15 items-center justify-center rounded-full bg-white hover:cursor-pointer sm:size-13"
				>
					<img src={imageMap.logo} alt="" aria-hidden className="h-9.5 sm:h-8.5" />
				</Link>
			</div>
			<p className="flex-1 text-center text-base font-bold text-white md:max-lg:hidden lg:block lg:text-xl xl:text-2xl">
				{t("header.site_title")}
			</p>
			<nav aria-label={t("header.aria_primary_nav")} className="flex flex-1 justify-end gap-x-2 md:gap-x-0">
				{isHome ? (
					<ul className="hidden md:flex md:items-center md:justify-center">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link
									to={link.href}
									aria-current={isCurrentLink(link.href) ? "true" : undefined}
									className={cl(
										"p-2 text-white transition",
										isCurrentLink(link.href)
											? "font-bold underline underline-offset-4"
											: "hover:font-bold hover:underline hover:underline-offset-4",
									)}
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
							className="relative top-px h-4 w-4"
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
				<LanguageSwitcher bgColor="bg-burgundy" />
				<button
					ref={menuBtnRef}
					type="button"
					className={cl(
						"hamburger group z-40 hover:cursor-pointer focus:outline-none md:hidden",
						isMenuOpen ? "open top-2" : "top-3",
					)}
					onClick={handleBurgerClick}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					aria-label={isMenuOpen ? t("header.aria_close_menu") : t("header.aria_open_menu")}
				>
					<span className="hamburger-top group-hover:bg-white"></span>
					<span className="hamburger-middle"></span>
					<span className="hamburger-bottom group-hover:bg-white"></span>
				</button>
			</nav>
			<div
				id="mobile-menu"
				ref={menuRef}
				hidden={!isMenuOpen}
				className={cl("mobile-menu", isMenuOpen ? "flex" : "hidden")}
				onClick={handleMenuOverlayClick}
			>
				<nav aria-label={t("header.aria_mobile_nav")} className="w-full pt-30">
					<ul className="col-items-center w-full gap-y-7.5">
						{navlinks.map((link) => (
							<li key={link.name}>
								<Link
									to={isHome ? link.href : link.backURL}
									aria-current={isHome && isCurrentLink(link.href) ? "true" : undefined}
									onClick={closeMenu}
								>
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
