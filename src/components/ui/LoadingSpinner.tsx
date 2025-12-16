import { cl } from "@/utils/utils";

const LoadingSpinner = ({ isFullscreen }: { isFullscreen?: boolean }) => {
	return (
		<div className={cl("flex items-center justify-center", isFullscreen ? "h-screen" : "h-full")}>
			<div className="border-burgundy size-20 animate-spin rounded-full border-t-4 border-b-4"></div>
		</div>
	);
};

export default LoadingSpinner;
