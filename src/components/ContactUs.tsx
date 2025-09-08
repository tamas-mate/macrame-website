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

	return (
		<div className="xsl:px-0 xsl:w-auto flex w-full flex-col gap-y-10 px-5">
			<h2 className="self-center text-2xl md:self-start">Leave a Message</h2>
			<form ref={form} action={action} className="flex flex-col gap-y-5">
				<input type="hidden" name="time" value={getFormattedDate()}></input>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="bg-white p-3 text-black outline-none"
					placeholder="Your Name"
					autoComplete="name"
				/>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="bg-white p-3 text-black outline-none"
					placeholder="Your Email"
					autoComplete="email"
				/>
				<label htmlFor="title">Subject:</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					className="bg-white p-3 text-black outline-none"
					placeholder="Subject"
					autoComplete="off"
				/>
				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					name="message"
					required
					className="resize-y bg-white p-3 text-black outline-none"
					placeholder="Your Message"
					autoComplete="off"
				/>
				<div className="xsl:w-auto xsl:overflow-auto min-h-19.5 w-full overflow-hidden">
					<ReCAPTCHA ref={recaptcha} sitekey="6LccW50rAAAAAMJhy0koL3hKIlWXBQlFhWsCJtXL" />
				</div>
				<div className="flex items-center justify-center">
					<button
						type="submit"
						disabled={isPending}
						className="hover:bg-darker-pink w-1/3 rounded-full bg-white px-5 py-3 text-black hover:cursor-pointer hover:text-white disabled:cursor-not-allowed"
					>
						{isPending ? "Sending ..." : "Send"}
					</button>
				</div>
			</form>
		</div>
	);
};
