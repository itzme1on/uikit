import classNames from "classnames";
import React, { useRef } from "react";

interface Props {
	children?: React.ReactElement;
	onClick?: () => void;
	className?: string;
}

const Backdrop = ({ children, onClick, className }: Props) => {
	const ref = useRef(null);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target != ref.current || !onClick) {
			return;
		}

		onClick();
	};

	return (
		<div
			ref={ref}
			onClick={handleClick}
			className={classNames(
				"iui:bg-background-backdrop/50 iui:flex iui:flex-col iui:items-center iui:w-screen iui:h-screen iui:min-h-full iui:max-h-full iui:overflow-y-auto",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Backdrop;
