import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import FieldErrorMsg from "@/components/contact/FieldErrorMsg";
import { useAuth } from "@/hooks/useAuth";
import type { LoginForm } from "@/types";
import { cl, collapseTrim, customToast, INPUTLIMITS } from "@/utils/utils";

const DashboardLogin = () => {
	const {
		login: { isPending, mutate },
	} = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginForm>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { t } = useTranslation("backend");

	const onSubmit = async (data: LoginForm) => {
		mutate(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => reset(),
				onError: (error) => customToast(t("dashboard.auth.login_error", { error: error.message }), "error"),
			},
		);
	};

	return (
		<div className="text-burgundy flex h-screen items-center justify-center">
			<div className="flex flex-col gap-7.5">
				<h2 className="text-2xl font-bold">{t("dashboard.auth.title")}</h2>
				<form className="flex flex-col gap-7.5" onSubmit={handleSubmit(onSubmit)}>
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
						autoFocus
						placeholder={t("dashboard.auth.fields.email.placeholder")}
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
					<label htmlFor="password">{t("common.fields.label.password")}:</label>
					<input
						{...register("password", {
							required: { value: true, message: "common.validation.required" },
							minLength: { value: INPUTLIMITS.password.min, message: "common.validation.min" },
							maxLength: { value: INPUTLIMITS.password.max, message: "common.validation.max" },
						})}
						id="password"
						className={cl("input", errors.password && "input-error")}
						type="password"
						autoComplete="off"
						placeholder={t("dashboard.auth.fields.password.placeholder")}
						aria-invalid={!!errors.password}
						aria-describedby={errors.password ? "password-error" : undefined}
					/>
					<FieldErrorMsg
						id="password-error"
						field="password"
						fieldLabel={t("common.fields.for_validation.password")}
						error={errors.password}
						t={t}
					/>
					<span id="auth-status" role="status" aria-live="polite" className="sr-only">
						{isPending ? t("dashboard.auth.buttons.logging_in") : ""}
					</span>
					<div className="flex items-center justify-center">
						<button
							type="submit"
							disabled={isPending}
							aria-busy={isPending}
							aria-disabled={isPending}
							aria-describedby="auth-status"
							className="submit-btn w-2/5"
						>
							<span>{isPending ? t("dashboard.auth.buttons.logging_in") : t("dashboard.auth.buttons.login")}</span>
						</button>
					</div>
				</form>
				<Link to="/" className="focus:outline-burgundy self-center hover:cursor-pointer hover:font-bold">
					{t("dashboard.nav.back_to_home")}
				</Link>
			</div>
		</div>
	);
};

export default DashboardLogin;
