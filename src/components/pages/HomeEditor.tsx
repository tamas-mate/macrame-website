import { useState } from "react";

import SectionTranslationsForm from "../dashboard/translations/SectionTranslationsForm";
import LoadingSpinner from "../ui/LoadingSpinner";

import { sections } from "@/constants";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import { useSectionTranslations } from "@/hooks/useSectionTranslations";

const HomeEditor = () => {
	const { i18n } = useDbTranslations();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
	const [selectedOption, setSelectedOption] = useState(sections[0].value);
	const options = !selectedOption ? sections : sections.filter((section) => section.id !== 1);
	const { isLoading, data, error } = useSectionTranslations(selectedOption);
	console.log("isLoading, data, error", isLoading, data, error);

	if (error) return <div className="text-red-500">{error.message}</div>;

	return (
		<div className="flex h-full flex-col items-center gap-y-5">
			<h2 className="self-center">Please select a section to edit</h2>
			<select
				name="section"
				disabled={isLoading}
				value={selectedOption}
				onChange={(e) => setSelectedOption(e.target.value)}
			>
				{options.map((option) => (
					<option key={option.id} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
			{isLoading && <LoadingSpinner isFullscreen={false} />}
			{!isLoading && data && (
				<SectionTranslationsForm
					key={`${currentLanguage}-${selectedOption}`}
					inputs={data}
					locale={currentLanguage}
					section={selectedOption}
				/>
			)}
		</div>
	);
};

export default HomeEditor;
