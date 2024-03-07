import React from "react";

type SpinnerProps = {
	className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
	return (
		<div
			className={`mt-10 flex h-screen w-full items-center justify-center ${className || ""}`}
			aria-busy="true"
		>
			<div className="loader flex w-full items-center justify-center"></div>
		</div>
	);
};

export default Spinner;
