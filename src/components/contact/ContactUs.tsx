import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { ContactForm } from "@/types";
import { cl, collapseTrim, customToast, getFormattedDate, initObserver, INPUTLIMITS } from "@/utils/utils";
import FieldErrorMsg from "./FieldErrorMsg";

export const ContactUs = () => {
	const recaptcha = useRef<ReCAPTCHA | null>(null);
	const isMounted = useRef(false);
	const [isPending, setIsPending] = useState(false);
	const { t } = useTranslation("backend");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactForm>({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const safeSetPending = (v: boolean) => {
		if (isMounted.current) setIsPending(v);
	};

	const onSubmit = async (data: ContactForm) => {
		safeSetPending(true);

		let shouldResetRecaptcha = false;

		try {
			initObserver();

			const token = recaptcha.current?.getValue();

			if (!token) {
				customToast(t("contact_footer.validation.recaptcha_failed"), "error");
				return;
			}

			shouldResetRecaptcha = true;

			const response = await emailjs.send(
				"contact_service",
				"contact_form",
				{
					name: data.name,
					email: data.email,
					title: data.subject,
					message: data.message,
					time: getFormattedDate(),
					"g-recaptcha-response": token,
				},
				{
					publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				},
			);

			if (response.status === 200) {
				customToast(t("contact_footer.validation.success"), "success");
				reset();
			} else {
				customToast(t("contact_footer.validation.send_failed"), "error");
			}
		} catch (error) {
			customToast(t("contact_footer.validation.send_failed"), "error");
			console.error("Failed to send the message! Error:", error);
		} finally {
			if (shouldResetRecaptcha) recaptcha.current?.reset();
			safeSetPending(false);
		}
	};

	const onInvalid = (formErrors: FieldErrors<ContactForm>) => {
		if (Object.keys(formErrors).length > 0) {
			customToast(t("contact_footer.validation.check_inputs"), "error");
		}
	};

	return (
		<div className="xsm:px-0 xsm:w-auto text-burgundy flex w-full flex-col gap-y-10 px-5">
			<h2 className="self-center text-2xl md:self-start">{t("contact_footer.form.title")}</h2>
			<form
				onSubmit={handleSubmit(onSubmit, onInvalid)}
				className="flex flex-col gap-y-3"
				aria-busy={isPending}
				spellCheck="false"
			>
				<label htmlFor="name">{t("common.fields.label.name")}:</label>
				<input
					{...register("name", {
						setValueAs: collapseTrim,
						required: { value: true, message: "common.validation.required" },
						maxLength: { value: INPUTLIMITS.name.max, message: "common.validation.max" },
					})}
					id="name"
					className={cl("input", errors.name && "input-error")}
					type="text"
					autoComplete="name"
					placeholder={t("contact_footer.form.fields.name.placeholder")}
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? "name-error" : undefined}
				/>
				<FieldErrorMsg
					id="name-error"
					field="name"
					fieldLabel={t("common.fields.for_validation.name")}
					error={errors.name}
					t={t}
				/>
				<label htmlFor="email">{t("common.fields.label.email")}:</label>
				<input
					{...register("email", {
						setValueAs: collapseTrim,
						required: { value: true, message: "common.validation.required" },
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "common.validation.email_invalid",
						},
						minLength: { value: INPUTLIMITS.email.min, message: "common.validation.min" },
						maxLength: { value: INPUTLIMITS.email.max, message: "common.validation.max" },
					})}
					id="email"
					className={cl("input", errors.email && "input-error")}
					type="email"
					autoComplete="email"
					placeholder={t("contact_footer.form.fields.email.placeholder")}
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? "email-error" : undefined}
				/>
				<FieldErrorMsg
					id="email-error"
					field="email"
					fieldLabel={t("common.fields.for_validation.email")}
					error={errors.email}
					t={t}
				/>
				<label htmlFor="subject">{t("common.fields.label.subject")}:</label>
				<input
					{...register("subject", {
						setValueAs: collapseTrim,
						required: { value: true, message: "common.validation.required" },
						maxLength: { value: INPUTLIMITS.subject.max, message: "common.validation.max" },
					})}
					id="subject"
					className={cl("input", errors.subject && "input-error")}
					type="text"
					autoComplete="off"
					placeholder={t("common.fields.label.subject")}
					aria-invalid={!!errors.subject}
					aria-describedby={errors.subject ? "subject-error" : undefined}
				/>
				<FieldErrorMsg
					id="subject-error"
					field="subject"
					fieldLabel={t("common.fields.for_validation.subject")}
					error={errors.subject}
					t={t}
				/>
				<label htmlFor="message">{t("common.fields.label.message")}:</label>
				<textarea
					{...register("message", {
						required: "common.validation.required",
						setValueAs: collapseTrim,
						minLength: { value: INPUTLIMITS.message.min, message: "common.validation.min" },
						maxLength: { value: INPUTLIMITS.message.max, message: "common.validation.max" },
					})}
					id="message"
					className={cl("input resize-y", errors.message && "input-error")}
					autoComplete="off"
					placeholder={t("contact_footer.form.fields.message.placeholder")}
					aria-invalid={!!errors.message}
					aria-describedby={errors.message ? "message-error" : undefined}
				/>
				<FieldErrorMsg
					id="message-error"
					field="message"
					fieldLabel={t("common.fields.for_validation.message")}
					error={errors.message}
					t={t}
				/>
				<div className="xsm:w-auto xsm:overflow-auto min-h-19.5 w-full overflow-hidden">
					<div id="captcha-help" className="sr-only">
						{t("contact_footer.form.recaptcha")}
					</div>
					<ReCAPTCHA
						ref={recaptcha}
						sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
						aria-describedby="captcha-help"
					/>
				</div>
				<span id="contact-status" role="status" aria-live="polite" className="sr-only">
					{isPending ? t("contact_footer.form.buttons.sending") : ""}
				</span>
				<div className="flex items-center justify-center">
					<button
						type="submit"
						disabled={isPending || isSubmitting}
						aria-busy={isPending}
						aria-disabled={isPending}
						aria-describedby="contact-status"
						className="submit-btn w-1/3"
					>
						<span>{isPending ? t("contact_footer.form.buttons.sending") : t("contact_footer.form.buttons.send")}</span>
					</button>
				</div>
			</form>
		</div>
	);
};
