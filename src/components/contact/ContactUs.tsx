import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import type { FormData } from "@/types";
import { cl, collapseTrim, getFormattedDate, initObserver, INPUTLIMITS, toastConfig } from "@/utils/utils";
import FieldErrorMsg from "./FieldErrorMsg";

export const ContactUs = () => {
	const recaptcha = useRef<ReCAPTCHA | null>(null);
	const [isPending, setIsPending] = useState(false);
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			name: "",
			email: "",
			title: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		try {
			setIsPending(true);

			if (errors.name || errors.email || errors.title || errors.message) {
				toast.error(t("contact_footer.validation.check_inputs"), toastConfig);
				setIsPending(false);
				return;
			}

			initObserver();

			const token = recaptcha.current?.getValue();

			if (!token) {
				toast.error(t("contact_footer.validation.recaptcha_failed"), toastConfig);
				setIsPending(false);
				return;
			}

			const templateParams = {
				name: data.name,
				email: data.email,
				title: data.title,
				message: data.message,
				time: getFormattedDate(),
				"g-recaptcha-response": token,
			};

			const response = await emailjs.send("contact_service", "contact_form", templateParams, {
				publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			});

			if (response.status === 200) {
				toast.success(t("contact_footer.validation.success"), toastConfig);
				reset();
				setIsPending(false);
			}
		} catch (error) {
			toast.error(t("contact_footer.validation.send_failed"), toastConfig);
			console.error("Failed to send the message! Error:", error);
			setIsPending(false);
		}

		recaptcha.current?.reset();
	};

	return (
		<div className="xsm:px-0 xsm:w-auto flex w-full flex-col gap-y-10 px-5">
			<h2 className="self-center text-2xl text-black md:self-start">{t("contact_footer.title")}</h2>
			<form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
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
				/>
				<FieldErrorMsg field="name" error={errors.name} t={t} />
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
				/>
				<FieldErrorMsg field="email" error={errors.email} t={t} />
				<label htmlFor="title" className="text-black">
					{t("contact_footer.form.subject")}:
				</label>
				<input
					{...register("title", {
						setValueAs: collapseTrim,
						required: "contact_footer.validation.subject_required",
						maxLength: { value: INPUTLIMITS.subject.max, message: "contact_footer.validation.subject_max" },
					})}
					id="title"
					className={cl("bg-white p-3 text-black outline-none", errors.title && "border-input-error border-2")}
					type="text"
					autoComplete="off"
					placeholder={t("contact_footer.form.subject")}
				/>
				<FieldErrorMsg field="subject" error={errors.title} t={t} />
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
				/>
				<FieldErrorMsg field="message" error={errors.message} t={t} />
				<div className="xsm:w-auto xsm:overflow-auto min-h-19.5 w-full overflow-hidden">
					<ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
				</div>
				<div className="flex items-center justify-center">
					<button
						type="submit"
						disabled={isPending}
						className="hover:bg-burgundy w-1/3 rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
					>
						<span>{isPending ? t("contact_footer.button.sending") : t("contact_footer.button.send")}</span>
					</button>
				</div>
			</form>
		</div>
	);
};
