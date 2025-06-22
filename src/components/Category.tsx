import { useParams } from "react-router";

const Category = () => {
	const { category } = useParams();

	return <div>Selected category: {category}</div>;
};

export default Category;
