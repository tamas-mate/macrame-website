const LoadingSpinner = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="border-burgundy h-20 w-20 animate-spin rounded-full border-t-4 border-b-4"></div>
		</div>
	);
};

export default LoadingSpinner;
