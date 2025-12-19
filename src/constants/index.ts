import logo from "@/assets/images/logo.png";
import type { StringMap } from "@/types";
import categoryBracelet from "../assets/images/category-bracelets.jpg";
import categoryDecorations from "../assets/images/category-decorations.jpg";
import categoryEarringst from "../assets/images/category-earrings.jpg";
import categoryNecklaces from "../assets/images/category-necklaces.jpg";
import categoryRings from "../assets/images/category-rings.jpg";
import categorySets from "../assets/images/category-sets.jpg";
import about from "../assets/images/mi.jpg";

export const imageMap: StringMap = {
	logo,
	bracelets: categoryBracelet,
	decorations: categoryDecorations,
	earrings: categoryEarringst,
	necklaces: categoryNecklaces,
	rings: categoryRings,
	sets: categorySets,
	about,
};

export const navlinks = [
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

export const languages = [
	{ label: "HU", value: "hu" },
	{ label: "RO", value: "ro" },
	{ label: "EN", value: "en" },
];

export const categories = ["earrings", "necklaces", "bracelets", "rings", "decorations", "sets"];

export const INPUTLIMITS = {
	name: { max: 50 },
	email: { min: 3, max: 100 },
	subject: { max: 100 },
	message: { min: 10, max: 1000 },
	password: { min: 6, max: 100 },
	section: { min: 10, max: 10000 },
};

export const dashboardNavlinks = [
	{
		name: "dashboard.nav.home",
		href: "/dashboard",
	},
	{
		name: "dashboard.nav.catalog",
		href: "/dashboard/catalog",
	},
	{
		name: "dashboard.nav.back_to_home",
		href: "/",
	},
];

export const sections = [
	{
		id: 1,
		value: "",
		name: "dashboard.home.sections.option_default",
	},
	{
		id: 2,
		value: "home.macrame_intro",
		name: "header.nav.macrame",
	},
	{
		id: 3,
		value: "home.meet_ilona",
		name: "header.nav.about",
	},
	{
		id: 4,
		value: "home.collection_overview",
		name: "header.nav.products",
	},
	{
		id: 5,
		value: "category.titles",
		name: "dashboard.home.sections.option_category",
	},
];
