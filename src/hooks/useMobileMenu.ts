import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useMobileMenu() {
	const menuBtnRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = (e?: MouseEvent) => {
		e?.stopPropagation();
		setIsMenuOpen((prev) => !prev);
	};

	const closeMenu = () => setIsMenuOpen(false);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;

		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = previousOverflow;
			menuBtnRef.current?.focus();
		}

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) return;

		const menuNode = menuRef.current;
		if (!menuNode) return;

		const previouslyFocusedElement = document.activeElement as HTMLElement | null;
		const focusableSelectors = 'a, button, [tabindex]:not([tabindex="-1"])';
		const focusableElements = Array.from(menuNode.querySelectorAll<HTMLElement>(focusableSelectors));

		if (!focusableElements.length) return;

		const first = focusableElements[0];
		const last = focusableElements[focusableElements.length - 1];

		first.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				setIsMenuOpen(false);
				return;
			}

			if (event.key !== "Tab") return;

			if (event.shiftKey) {
				if (document.activeElement === first) {
					event.preventDefault();
					last?.focus();
				}
			} else {
				if (document.activeElement === last) {
					event.preventDefault();
					first?.focus();
				}
			}
		};

		menuNode.addEventListener("keydown", handleKeyDown);

		return () => {
			menuNode.removeEventListener("keydown", handleKeyDown);
			previouslyFocusedElement?.focus();
		};
	}, [isMenuOpen]);

	return {
		isMenuOpen,
		toggleMenu,
		closeMenu,
		menuBtnRef,
		menuRef,
	};
}
