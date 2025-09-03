import { useActionState, useRef } from "react";
// import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactUs = () => {
	const form = useRef<HTMLFormElement>(null);
	const recaptcha = useRef<ReCAPTCHA | null>(null);

	const sendEmail = async (_actionState: null, formData: FormData) => {
		console.log("sendEmail called");
		const captchaValue = recaptcha.current!.getValue();

		if (!captchaValue) {
			alert("Please verify the reCAPTCHA!");
		} else {
			const message = formData.get("message");
			console.log(message);
			console.log("Current form data", form.current!.message.value);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			alert("Form submission successful!");
		}

		recaptcha.current?.reset();

		return null;
		// emailjs
		// 	.sendForm("contact_service", "contact_form", form.current!, {
		// 		publicKey: "8c_1l4mpiEpavEL2d",
		// 	})
		// 	.then(
		// 		() => {
		// 			console.log("SUCCESS!");
		// 		},
		// 		(error) => {
		// 			console.log("FAILED...", error.text);
		// 		}
		// 	);
	};

	const [, action, isPending] = useActionState(sendEmail, null);

	const getFormattedDate = () => {
		const now = new Date();
		return now
			.toLocaleString("en-GB", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(",", "");
	};

	const onChange = (value: string | null) => {
		console.log("Captcha value:", value);
	};

	return (
		// TODO: Add form validation and error handling
		<form ref={form} action={action}>
			<input type="hidden" name="time" value={getFormattedDate()}></input>
			<div className="mb-2 flex flex-col">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="bg-white text-black outline-none"
					placeholder="Your Name"
					autoComplete="name"
				/>
			</div>
			<div className="mb-2 flex flex-col">
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="bg-white text-black outline-none"
					placeholder="Your Email"
					autoComplete="email"
				/>
			</div>
			<div className="mb-2 flex flex-col">
				<label htmlFor="title">Subject:</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					className="bg-white text-black outline-none"
					placeholder="Subject"
					autoComplete="off"
				/>
			</div>
			<div className="mb-4 flex flex-col">
				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					name="message"
					required
					className="resize bg-white text-black outline-none"
					placeholder="Your Message"
					autoComplete="off"
				/>
			</div>
			<div className="min-h-19.5">
				<ReCAPTCHA ref={recaptcha} sitekey="6LccW50rAAAAAMJhy0koL3hKIlWXBQlFhWsCJtXL" onChange={onChange} />
			</div>
			<div className="mt-2 flex items-center justify-center">
				<button type="submit" disabled={isPending} className="hover:cursor-pointer disabled:cursor-not-allowed">
					{isPending ? "Sending ..." : "Send"}
				</button>
			</div>
		</form>
	);
};
