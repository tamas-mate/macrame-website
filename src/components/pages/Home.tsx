import Artist from "../sections/artist/Artist";
import Macrame from "../sections/macrame/Macrame";
import Products from "../sections/products/Products";

const categories = ["earrings", "necklaces", "bracelets", "rings", "decorations", "sets"];

const Home = () => {
	return (
		<>
			<Macrame />
			<Artist />
			<Products categories={categories} />
		</>
	);
};

export default Home;
