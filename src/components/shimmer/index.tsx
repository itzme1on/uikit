import classNames from "classnames";
import React from "react";

interface Props {
	width?: string;
	height?: string;
	borderRadius?: string;
	className?: string;
}

const Shimmer = ({ width, height, borderRadius, className }: Props) => {
	return (
		<div
			className={classNames(
				"iui:animate-pulse iui:bg-stroke/70",
				{
					"iui:w-full": !width,
					"iui:h-full": !height,
					"iui:rounded-control": !borderRadius,
				},
				className
			)}
			style={{
				width,
				height,
				borderRadius,
			}}
		></div>
	);
};

export default Shimmer;
