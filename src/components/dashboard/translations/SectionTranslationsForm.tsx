import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FieldErrorMsg from "@/components/contact/FieldErrorMsg";
import { INPUTLIMITS } from "@/constants";
import supabase from "@/lib/supabase";
import type { TranslationForm, TranslationFormProps } from "@/types";
import { cl, customToast } from "@/utils/utils";

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
		values: {
			data: inputs.map((input) => ({ value: input.value_text, translationKeyId: input.translation_key_id })),
		},
		mode: "all",
	});
	const { t } = useTranslation("backend");

	const { isPending, mutate } = useMutation({
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
			customToast(t("dashboard.home.sections.changes_saved"), "success");
		},
		onError: (error) => {
			console.error(error);
			customToast(t("dashboard.home.sections.changes_failed", { error: error.message }), "error");
		},
	});

	const onSubmit = (data: TranslationForm) => {
		mutate(data);
	};

	return (
		<div className="scrollbar-hidden text-burgundy flex h-full w-full items-start justify-center overflow-y-scroll">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-4/5 flex-col items-center gap-y-10 pt-1"
				aria-busy={isPending}
				spellCheck="false"
			>
				{inputs.map((input, index) => {
					const fieldError = errors.data?.[index]?.value;
					return (
						<div key={input.translation_key_id} className="w-full">
							<input type="hidden" {...register(`data.${index}.translationKeyId` as const)} />
							<textarea
								{...register(`data.${index}.value` as const, {
									required: {
										value: true,
										message: t("common.validation.required"),
									},
									minLength: {
										value: INPUTLIMITS.section.min,
										message: t("common.validation.min"),
									},
								})}
								className={cl("input w-full", fieldError && "input-error")}
								autoComplete="off"
								placeholder=""
								autoFocus={index === 0}
								rows={input.value_text.length <= 100 ? 1 : 3}
								aria-invalid={!!fieldError?.message}
								aria-describedby={fieldError?.message ? `section${index}-error` : undefined}
							/>
							<FieldErrorMsg
								id={`section${index}-error`}
								field="section"
								fieldLabel={t("common.fields.for_validation.this")}
								error={fieldError}
								t={t}
							/>
						</div>
					);
				})}
				<span id="sections-status" role="status" aria-live="polite" className="sr-only">
					{isPending ? t("dashboard.home.sections.buttons.saving") : ""}
				</span>
				<button
					type="submit"
					disabled={isPending}
					aria-busy={isPending}
					aria-disabled={isPending}
					aria-describedby="sections-status"
					className="submit-btn"
				>
					{isPending ? t("dashboard.home.sections.buttons.saving") : t("dashboard.home.sections.buttons.save")}
				</button>
			</form>
		</div>
	);
};

export default SectionTranslationsForm;
