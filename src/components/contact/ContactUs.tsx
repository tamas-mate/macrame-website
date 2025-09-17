import type { FormData } from "@/types";
import { cl, getFormattedDate, initObserver } from "@/utils/utils";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const returnTrimmedValueOrLength = (type: "value" | "length", value: string) =>
	type === "value" ? value.trim() : value.trim().length;

const toastConfig = {
	theme: "dark",
};

export const ContactUs = () => {
	const recaptcha = useRef<ReCAPTCHA | null>(null);
	const [isPending, setIsPending] = useState(false);
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
				toast.error("Please check your inputs!", toastConfig);
				setIsPending(false);
				return;
			}

			initObserver();

			const token = recaptcha.current?.getValue();

			if (!token) {
				toast.error("Failed to verify reCAPTCHA!", toastConfig);
				setIsPending(false);
				return;
			}

			const templateParams = {
				name: returnTrimmedValueOrLength("value", data.name),
				email: returnTrimmedValueOrLength("value", data.email),
				title: returnTrimmedValueOrLength("value", data.title),
				message: returnTrimmedValueOrLength("value", data.message),
				time: getFormattedDate(),
				"g-recaptcha-response": token,
			};

			console.log("templateParams", templateParams);

			const response = await emailjs.send("contact_service", "contact_form", templateParams, {
				publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			});

			if (response.status === 200) {
				toast.success("Message sent successfully!", toastConfig);
				reset();
				setIsPending(false);
			}
		} catch (error) {
			toast.error("Failed to send the message!", toastConfig);
			console.error("Failed to send the message! Error:", error);
			setIsPending(false);
		}

		recaptcha.current?.reset();
	};

	return (
		<div className="xsm:px-0 xsm:w-auto flex w-full flex-col gap-y-10 px-5">
			<h2 className="self-center text-2xl md:self-start">Leave a Message</h2>
			<form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name:</label>
				<input
					{...register("name", {
						required: "Name is required!",
						validate: (value) => {
							if (+returnTrimmedValueOrLength("length", value) === 0) return "Name is required!";
							if (+returnTrimmedValueOrLength("length", value) > 50) return "Name must be less than 50 characters!";
						},
					})}
					id="name"
					className={cl("bg-white p-3 text-black outline-none", errors.name && "border-custom-red border-2")}
					type="text"
					autoComplete="name"
					placeholder="Your Name"
				/>
				{errors.name && <p className="text-bright-red text-xs">{errors.name.message}</p>}
				<label htmlFor="email">Email:</label>
				<input
					{...register("email", {
						required: "Email is required!",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email format!",
						},
						validate: (value) => {
							if (+returnTrimmedValueOrLength("length", value) === 0) return "Email is required!";
							if (+returnTrimmedValueOrLength("length", value) < 3) return "Email must be at least 3 characters!";
							if (+returnTrimmedValueOrLength("length", value) > 100) return "Email must be less than 100 characters!";
						},
					})}
					id="email"
					className={cl("bg-white p-3 text-black outline-none", errors.name && "border-custom-red border-2")}
					type="email"
					autoComplete="email"
					placeholder="Your Email"
				/>
				{errors.email && <p className="text-bright-red text-xs">{errors.email.message}</p>}
				<label htmlFor="title">Subject:</label>
				<input
					{...register("title", {
						required: "Subject is required!",
						validate: (value) => {
							if (+returnTrimmedValueOrLength("length", value) === 0) return "Subject is required!";
							if (+returnTrimmedValueOrLength("length", value) > 100)
								return "Subject must be less than 100 characters!";
						},
					})}
					id="title"
					className={cl("bg-white p-3 text-black outline-none", errors.name && "border-custom-red border-2")}
					type="text"
					autoComplete="off"
					placeholder="Subject"
				/>
				{errors.title && <p className="text-bright-red text-xs">{errors.title.message}</p>}
				<label htmlFor="message">Message:</label>
				<textarea
					{...register("message", {
						required: "Message is required!",
						validate: (value) => {
							if (+returnTrimmedValueOrLength("length", value) === 0) return "Message is required!";
							if (+returnTrimmedValueOrLength("length", value) < 10) return "Message must be at least 10 characters!";
							if (+returnTrimmedValueOrLength("length", value) > 1000)
								return "Message must be less than 1000 characters!";
						},
					})}
					id="message"
					className={cl("resize-y bg-white p-3 text-black outline-none", errors.name && "border-custom-red border-2")}
					autoComplete="off"
					placeholder="Your Message"
				/>
				{errors.message && <p className="text-bright-red text-xs">{errors.message.message}</p>}
				<div className="xsm:w-auto xsm:overflow-auto min-h-19.5 w-full overflow-hidden">
					<ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
				</div>
				<div className="flex items-center justify-center">
					<button
						type="submit"
						disabled={isPending}
						className="hover:bg-darker-pink w-1/3 rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
					>
						<span>{isPending ? "Sending" : "Send"}</span>
					</button>
				</div>
			</form>
		</div>
	);
};
