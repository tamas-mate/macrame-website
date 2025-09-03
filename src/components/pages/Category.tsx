import { useParams } from "react-router";

const Category = () => {
	const { category } = useParams();

	return <div className="mt-header-height">Selected category: {category}</div>;
};

export default Category;
