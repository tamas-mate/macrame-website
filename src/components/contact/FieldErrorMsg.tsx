import type { FieldError } from "react-hook-form";

import { INPUTLIMITS } from "@/utils/utils";

const FieldErrorMsg = ({
	id,
	field,
	error,
	t,
}: {
	id: string;
	field: keyof typeof INPUTLIMITS;
	error?: FieldError;
	t: (k: string, o?: { value: number }) => string;
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
			{t(error.message as string, num ? { value: num } : undefined)}
		</span>
	);
};

export default FieldErrorMsg;
