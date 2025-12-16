import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import supabase from "@/lib/supabase";
import type { TranslationForm, TranslationFormProps } from "@/types";
import { cl, customToast } from "@/utils/utils";
import { useEffect, useEffectEvent } from "react";

const SectionTranslationsForm = ({ inputs, locale }: TranslationFormProps) => {
	"use no memo";
	const queryClient = useQueryClient();
	const originalInputs = Object.fromEntries(inputs.map((input) => [input.translation_key_id, input.value_text]));

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TranslationForm>({
		defaultValues: {
			data: inputs.map((input) => ({ value: input.value_text, translationKeyId: input.translation_key_id })),
		},
		mode: "all",
	});

	const onReset = useEffectEvent((inputs: TranslationFormProps["inputs"]) =>
		reset({
			data: inputs.map((input) => ({ value: input.value_text, translationKeyId: input.translation_key_id })),
		}),
	);

	useEffect(() => {
		onReset(inputs);
	}, [inputs]);

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
				predicate: (query) => query.queryKey[0] === "translations",
			});
			customToast("Changes saved", "success");
		},
		onError: (error) => {
			console.error(error);
			customToast("Failed to save changes!", "error");
		},
	});

	const onSubmit = (data: TranslationForm) => {
		formMutation.mutate(data);
	};

	return (
		<div className="scrollbar-hidden text-burgundy flex h-full w-full items-start justify-center overflow-y-scroll">
			<form onSubmit={handleSubmit(onSubmit)} className="flex w-4/5 flex-col items-center gap-y-10 pt-1">
				{inputs.map((input, index) => {
					const fieldError = errors.data?.[index]?.value;
					return (
						<div key={input.translation_key_id} className="w-full">
							<input type="hidden" {...register(`data.${index}.translationKeyId` as const)} />
							<textarea
								{...register(`data.${index}.value` as const, {
									required: "This field is required",
									// minLength: {
									// 	value: 20,
									// 	message: "This field must be at least 20 characters",
									// },
								})}
								autoFocus={index === 0}
								spellCheck="false"
								rows={input.value_text.length <= 100 ? 1 : 3}
								className={cl("input w-full", fieldError && "input-error")}
							/>
							{fieldError && <span className="text-input-error">{fieldError.message}</span>}
						</div>
					);
				})}
				<button type="submit" className="submit-btn">
					Save changes
				</button>
			</form>
		</div>
	);
};

export default SectionTranslationsForm;
