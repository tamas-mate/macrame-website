import { useState } from "react";
import { useForm } from "react-hook-form";

// import FieldErrorMsg from "../contact/FieldErrorMsg";
import { useAuth } from "@/hooks/useAuth";
import type { LoginForm } from "@/types";
import { cl, collapseTrim, INPUTLIMITS } from "@/utils/utils";

const DashboardLogin = () => {
	const [isAuthenticationPending, setIsAuthenticationPending] = useState(false);
	const { login } = useAuth();
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

	const onSubmit = async (data: LoginForm) => {
		setIsAuthenticationPending(true);
		login(data.email, data.password);
		setIsAuthenticationPending(false);
		reset();
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col gap-7.5">
				<h2 className="text-2xl font-bold">Log in to access the dashboard</h2>
				<form className="flex flex-col gap-7.5" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("email", {
							setValueAs: collapseTrim,
							required: { value: true, message: "Email is required!" },
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email format!",
							},
							minLength: { value: INPUTLIMITS.email.min, message: "Minimum 3 characters!" },
							maxLength: { value: INPUTLIMITS.email.max, message: "Maximum 100 characters!" },
						})}
						id="email"
						className={cl("bg-white p-3 text-black outline-none", errors.email && "border-input-error border-2")}
						type="email"
						autoComplete="email"
						placeholder="Your Email"
					/>
					{errors.email && <span className="text-input-error text-xs">{errors.email.message}</span>}
					<input
						{...register("password", {
							required: { value: true, message: "Password is required!" },
							minLength: { value: 6, message: "Minimum 6 characters!" },
							maxLength: { value: 64, message: "Maximum 64 characters!" },
						})}
						id="password"
						className={cl("bg-white p-3 text-black outline-none", errors.email && "border-input-error border-2")}
						type="password"
						autoComplete="off"
						placeholder="Your Password"
					/>
					{errors.password && <span className="text-input-error text-xs">{errors.password.message}</span>}
					<div className="flex items-center justify-center">
						<button
							type="submit"
							disabled={isAuthenticationPending}
							className="hover:bg-burgundy w-1/3 rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
						>
							<span>{isAuthenticationPending ? "Logging in..." : "Log in"}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardLogin;
