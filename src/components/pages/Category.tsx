import { useParams } from "react-router";

const Category = () => {
	const { category } = useParams();

	return <div className="">Selected category: {category}</div>;
};

export default Category;
