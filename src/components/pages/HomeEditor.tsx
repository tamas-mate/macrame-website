import { useState } from "react";

import SectionTranslationsForm from "../dashboard/translations/SectionTranslationsForm";
import LoadingSpinner from "../ui/LoadingSpinner";

import { sections } from "@/constants";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import { useSectionTranslations } from "@/hooks/useSectionTranslations";

const HomeEditor = () => {
	const { i18n, ready } = useDbTranslations();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
	const [selectedOption, setSelectedOption] = useState(sections[0].value);
	const { isLoading, isError, data, error } = useSectionTranslations(selectedOption, currentLanguage, ready);
	const options = !selectedOption ? sections : sections.filter((section) => section.id !== 1);
	const currentOptionLabel = options.find((option) => option.value === selectedOption)?.name;

	if (isError)
		return <div className="text-input-error flex h-full w-full items-center justify-center">{error?.message}</div>;

	return (
		<div className="text-burgundy flex h-full flex-col items-center gap-y-5 py-10">
			<h3 className="self-center text-xl font-bold">
				{!selectedOption ? "Please select a section to edit" : `Now editing the ${currentOptionLabel} section`}
			</h3>
			<select
				name="section"
				className="text-lg hover:cursor-pointer hover:font-bold"
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
				<SectionTranslationsForm key={`${currentLanguage}-${selectedOption}`} inputs={data} locale={currentLanguage} />
			)}
		</div>
	);
};

export default HomeEditor;
