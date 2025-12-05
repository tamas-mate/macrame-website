import { useState } from "react";

import { useSectionTranslations } from "@/hooks/useSectionTranslations";

const HomeEditor = () => {
	const [selectedOption, setSelectedOption] = useState("");
	const { isPending, data, error } = useSectionTranslations(selectedOption);
	console.log("isPending, data, error", isPending, data, error);

	return (
		<div className="flex flex-col items-center">
			<h2 className="self-start">Please select a section to edit</h2>
			<select name="section" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
				{!selectedOption && <option value="">Select a section</option>}
				<option value="home.macrame_intro">Macrame</option>
				<option value="home.meet_ilona">About</option>
				<option value="home.collection_overview">Products</option>
				<option value="category.titles">Category</option>
			</select>
		</div>
	);
};

export default HomeEditor;
