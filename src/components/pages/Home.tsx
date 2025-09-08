import Macrame from "../sections/macrame/Macrame";

import Artist from "../sections/artist/Artist";
import Products from "../sections/products/Products";

const categories = ["earrings", "necklaces", "bracelets", "rings", "decorations", "sets"];

const Home = () => {
	return (
		<main className="flex w-full flex-col items-center gap-y-15 px-5 sm:container sm:px-10 2xl:px-0">
			<Macrame />
			<Artist />
			<Products categories={categories} />
		</main>
	);
};

export default Home;
