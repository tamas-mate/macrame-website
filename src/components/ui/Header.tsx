const Header = () => {
	const handleMenuToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		const menuBtn = document.getElementById("menu-btn") as HTMLDivElement;
		const menu = document.getElementById("menu") as HTMLDivElement;
		menuBtn.classList.toggle("open");
		menu.classList.toggle("hidden");
		menu.classList.toggle("flex");
	};

	return (
		<header className="fixed top-0 left-0 w-full h-header-height flex justify-between items-center px-30 bg-primary-dark">
			<div className="flex justify-center items-center rounded-full w-25 h-25 bg-white">
				<img src="images/logo.png" alt="website-logo" className="h-12.5" />
			</div>
			<nav>
				<div className="hidden md:flex md:justify-center md:items-center">
					<a href="#macrame" className="p-2 text-white">
						Macrame
					</a>
					<a href="#artist" className="p-2 text-white">
						Artist
					</a>
					<a href="#products" className="p-2 text-white">
						Products
					</a>
					<a href="#footer" className="p-2 text-white">
						Contact
					</a>
				</div>
				{/* Hamburger Button  */}
				<div className="md:hidden">
					<button
						id="menu-btn"
						type="button"
						className="z-40 block hamburger md:hidden focus:outline-none hover:cursor-pointer"
						onClick={handleMenuToggle}
					>
						<span className="hamburger-top"></span>
						<span className="hamburger-middle"></span>
						<span className="hamburger-bottom"></span>
					</button>
				</div>
			</nav>
			<div id="menu" className="hidden mobile-menu" onClick={handleMenuToggle}>
				<a href="#macrame" className="mt-10" onClick={handleMenuToggle}>
					Macrame
				</a>
				<a href="#artist" onClick={handleMenuToggle}>
					Artist
				</a>
				<a href="#products" onClick={handleMenuToggle}>
					Products
				</a>
				<a href="#footer" onClick={handleMenuToggle}>
					Contact
				</a>
			</div>
		</header>
	);
};

export default Header;
