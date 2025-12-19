import clsx, { type ClassValue } from "clsx";
import { Bounce, toast, type ToastContainerProps } from "react-toastify";
import { twMerge } from "./../../node_modules/tailwind-merge/src/lib/tw-merge";

export const cl = (...classes: ClassValue[]) => {
	return twMerge(clsx(...classes));
};

export const toastContainerConfig: ToastContainerProps = {
	["aria-label"]: "Form Notification",
	position: "bottom-right",
	closeOnClick: true,
	draggable: true,
	transition: Bounce,
};

export const customToast = (message: string, type: "success" | "error") => {
	return type === "success"
		? toast.success(message, {
				className: "text-green-500!",
			})
		: toast.error(message, { className: "text-input-error!" });
};

export const getFormattedDate = () => {
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

export const collapseTrim = (value: unknown) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim() : value);

// Function that initializes a MutationObserver for the captcha
export const initObserver = () => {
	// Find the captcha window by first getting a list of iFrames.
	// After that we find the correct iFrame based on the src attribute
	// The actualy DIV that hides it, is a grandparent. So we get the
	// parentNode prop 2 times.
	const recaptchaWindow = [...document.getElementsByTagName("iframe")]?.find((x) =>
		x.src.includes("google.com/recaptcha/api2/bframe"),
	)?.parentNode?.parentNode as HTMLDivElement;

	// Make sure it is defined (it was found in the doc) before we add the observer
	if (recaptchaWindow) {
		new MutationObserver(() => {
			// ReCaptcha changes these 3 props when going invisible.
			// To solve this, we put an observer on the attributes and
			// check if one of these 3 properties changed from their
			// initial value.
			if (
				recaptchaWindow.style.visibility !== "visible" ||
				recaptchaWindow.style.opacity !== "1" ||
				recaptchaWindow.style.top !== "10px"
			) {
				console.info("restoring ReCaptcha visibility");
				// If changed, put back on default values.
				recaptchaWindow.style.opacity = "1";
				recaptchaWindow.style.visibility = "visible";
				recaptchaWindow.style.top = "10px";
			}
		}).observe(recaptchaWindow, {
			attributeFilter: ["style"],
		});
	}
};
