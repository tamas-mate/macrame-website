import type { FieldError } from "react-hook-form";

import { INPUTLIMITS } from "@/utils/utils";

const FieldErrorMsg = ({
	id,
	field,
	fieldLabel,
	error,
	t,
}: {
	id: string;
	field: keyof typeof INPUTLIMITS;
	fieldLabel: string;
	error?: FieldError;
	t: (k: string, o?: { field?: string; value?: number }) => string;
}) => {
	if (!error?.message) return null;

	const num =
		error.type === "maxLength"
			? INPUTLIMITS[field].max
			: error.type === "minLength"
				? (INPUTLIMITS[field] as { min: number }).min
				: undefined;

	return (
		<span id={id} role="alert" className="text-input-error text-xs">
			{t(error.message as string, {
				field: fieldLabel,
				...(num ? { value: num } : {}),
			})}
		</span>
	);
};

export default FieldErrorMsg;
