import About from "../sections/about/About";
import Macrame from "../sections/macrame/Macrame";
import Products from "../sections/products/Products";

const categories = ["earrings", "necklaces", "bracelets", "rings", "decorations", "sets"];

const Home = () => {
	return (
		<>
			<Macrame />
			<About />
			<Products categories={categories} />
		</>
	);
};

export default Home;
