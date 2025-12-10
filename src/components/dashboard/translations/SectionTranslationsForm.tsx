import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import supabase from "@/lib/supabase";
import type { TranslationForm, TranslationFormProps } from "@/types";

const SectionTranslationsForm = ({ inputs, locale, section }: TranslationFormProps) => {
	const queryClient = useQueryClient();
	const originalInputs = Object.fromEntries(inputs.map((input) => [input.translation_key_id, input.value_text]));

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TranslationForm>({
		defaultValues: {
			data: inputs.map((input) => ({ value: input.value_text as string, translationKeyId: input.translation_key_id })),
		},
		shouldUnregister: true,
	});

	const { fields } = useFieldArray({
		name: "data",
		control,
		shouldUnregister: true,
	});

	const formMutation = useMutation({
		mutationFn: async (formData: TranslationForm) => {
			const changedInputs = formData.data.filter((item) => item.value !== originalInputs[item.translationKeyId]);
			const payload = changedInputs.map((item) => ({
				translation_key_id: item.translationKeyId,
				locale: locale,
				value_text: item.value,
			}));

			const { error } = await supabase
				.from("translations")
				.upsert(payload, { onConflict: "translation_key_id,locale" });

			if (error) throw error;
		},
		onSuccess: (_, formData) => {
			// mark form as clean but keep current values
			reset(formData, { keepValues: true });

			// refresh the query for this language+section
			queryClient.invalidateQueries({
				queryKey: ["section-translations", locale, section],
			});
			toast.success("Changes saved");
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to save changes!");
		},
	});

	const onSubmit = (data: TranslationForm) => {
		formMutation.mutate(data);
	};

	return (
		<div className="scrollbar-hidden flex h-full w-full items-start justify-center overflow-y-scroll">
			<form onSubmit={handleSubmit(onSubmit)} className="flex w-4/5 flex-col items-center gap-y-10">
				{fields.map((field, index) => (
					<div key={field.id} className="w-full">
						<input type="hidden" {...register(`data.${index}.translationKeyId` as const)} />
						<textarea
							{...register(`data.${index}.value` as const, { required: true })}
							rows={3}
							className="w-full bg-white p-5"
						/>
					</div>
				))}
				{errors.data && <p>{errors.data?.root?.message}</p>}
				<button
					type="submit"
					className="hover:bg-burgundy rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
				>
					Save changes
				</button>
			</form>
		</div>
	);
};

export default SectionTranslationsForm;
