import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, type FieldErrors } from "react-hook-form";

import { useDbTranslations } from "@/hooks/useDbTranslations";
import type { ContactForm } from "@/types";
import { cl, collapseTrim, customToast, getFormattedDate, initObserver, INPUTLIMITS } from "@/utils/utils";
import FieldErrorMsg from "./FieldErrorMsg";

export const ContactUs = () => {
	const recaptcha = useRef<ReCAPTCHA | null>(null);
	const isMounted = useRef(false);
	const [isPending, setIsPending] = useState(false);
	const { t } = useDbTranslations();
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
		<div className="xsm:px-0 xsm:w-auto flex w-full flex-col gap-y-10 px-5">
			<h2 className="self-center text-2xl text-black md:self-start">{t("contact_footer.title")}</h2>
			<form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit, onInvalid)} aria-busy={isPending}>
				<label htmlFor="name" className="text-black">
					{t("contact_footer.form.name")}:
				</label>
				<input
					{...register("name", {
						setValueAs: collapseTrim,
						required: { value: true, message: "contact_footer.validation.name_required" },
						maxLength: { value: INPUTLIMITS.name.max, message: "contact_footer.validation.name_max" },
					})}
					id="name"
					className={cl("bg-white p-3 text-black outline-none", errors.name && "border-input-error border-2")}
					type="text"
					autoComplete="name"
					placeholder={t("contact_footer.form.name_placeholder")}
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? "name-error" : undefined}
				/>
				<FieldErrorMsg id="name-error" field="name" error={errors.name} t={t} />
				<label htmlFor="email" className="text-black">
					{t("contact_footer.form.e_mail")}:
				</label>
				<input
					{...register("email", {
						setValueAs: collapseTrim,
						required: { value: true, message: "contact_footer.validation.e_mail_required" },
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "contact_footer.validation.e_mail_invalid",
						},
						minLength: { value: INPUTLIMITS.email.min, message: "contact_footer.validation.e_mail_min" },
						maxLength: { value: INPUTLIMITS.email.max, message: "contact_footer.validation.e_mail_max" },
					})}
					id="email"
					className={cl("bg-white p-3 text-black outline-none", errors.email && "border-input-error border-2")}
					type="email"
					autoComplete="email"
					placeholder={t("contact_footer.form.e_mail_placeholder")}
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? "email-error" : undefined}
				/>
				<FieldErrorMsg id="email-error" field="email" error={errors.email} t={t} />
				<label htmlFor="subject" className="text-black">
					{t("contact_footer.form.subject")}:
				</label>
				<input
					{...register("subject", {
						setValueAs: collapseTrim,
						required: "contact_footer.validation.subject_required",
						maxLength: { value: INPUTLIMITS.subject.max, message: "contact_footer.validation.subject_max" },
					})}
					id="subject"
					className={cl("bg-white p-3 text-black outline-none", errors.subject && "border-input-error border-2")}
					type="text"
					autoComplete="off"
					placeholder={t("contact_footer.form.subject")}
					aria-invalid={!!errors.subject}
					aria-describedby={errors.subject ? "subject-error" : undefined}
				/>
				<FieldErrorMsg id="subject-error" field="subject" error={errors.subject} t={t} />
				<label htmlFor="message" className="text-black">
					{t("contact_footer.form.message")}:
				</label>
				<textarea
					{...register("message", {
						required: "contact_footer.validation.message_required",
						setValueAs: collapseTrim,
						minLength: { value: INPUTLIMITS.message.min, message: "contact_footer.validation.message_min" },
						maxLength: { value: INPUTLIMITS.message.max, message: "contact_footer.validation.message_max" },
					})}
					id="message"
					className={cl(
						"resize-y bg-white p-3 text-black outline-none",
						errors.message && "border-input-error border-2",
					)}
					autoComplete="off"
					placeholder={t("contact_footer.form.message_placeholder")}
					aria-invalid={!!errors.message}
					aria-describedby={errors.message ? "message-error" : undefined}
				/>
				<FieldErrorMsg id="message-error" field="message" error={errors.message} t={t} />
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
				<span id="form-status" aria-live="polite" className="sr-only">
					{isPending ? t("contact_footer.button.sending") : ""}
				</span>
				<div className="flex items-center justify-center">
					<button
						type="submit"
						disabled={isPending || isSubmitting}
						aria-disabled={isPending}
						className="hover:bg-burgundy w-1/3 rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
					>
						<span>{isPending ? t("contact_footer.button.sending") : t("contact_footer.button.send")}</span>
					</button>
				</div>
			</form>
		</div>
	);
};
