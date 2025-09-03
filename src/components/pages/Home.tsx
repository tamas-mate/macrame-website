import Macrame from "../sections/macrame/Macrame";

import Artist from "../sections/artist/Artist";
import Products from "../sections/products/Products";

const categories = ["earrings", "necklaces", "bracelets", "rings", "decorations", "sets"];

const Home = () => {
	return (
		<main className="pt-header-height bg-primary-light">
			<Macrame />
			<Artist />
			<Products categories={categories} />
		</main>
	);
};

export default Home;
