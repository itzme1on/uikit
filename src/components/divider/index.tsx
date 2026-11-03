import classNames from "classnames";
import React from "react";

interface Props {
	children?:
		| string
		| React.ReactElement
		| React.ReactElement[]
		| React.ReactNode;
	childrenAlign?: "start" | "center" | "end";
	childrenGap?: number;
	color?: string;
	indent?: number;
	endIndent?: number;
	thickness?: number;
	orientation?: "vertical" | "horizontal";
}

const Divider = ({
	children,
	childrenAlign = "center",
	color,
	indent,
	endIndent,
	thickness,
	childrenGap,
	orientation = "horizontal",
}: Props) => {
	const line = (
		<div
			className={classNames("iui:flex-1 iui:rounded-full", {
				"iui:border-stroke": !color,
				"iui:border-t iui:max-h-0": orientation == "horizontal",
				"iui:border-l iui:max-w-0": orientation == "vertical",
			})}
			style={{
				borderTopWidth:
					!!thickness && orientation == "horizontal"
						? `${thickness}px !important`
						: undefined,
				borderLeftWidth:
					!!thickness && orientation == "vertical"
						? `${thickness}px !important`
						: undefined,
				borderColor: !!color ? color : undefined,
			}}
		></div>
	);

	let row;

	if (children) {
		row = (
			<div
				className={classNames("iui:flex iui:flex-1", {
					"iui:gap-2": !childrenGap,

					"iui:flex-row iui:items-center iui:w-full iui:min-w-full":
						orientation == "horizontal",
					"iui:flex-col iui:items-center iui:h-full iui:min-h-full":
						orientation == "vertical",

					"iui:text-start": childrenAlign == "start",
					"iui:text-center": childrenAlign == "center",
					"iui:text-end": childrenAlign == "end",
				})}
				style={{
					gap: !!childrenGap ? `${childrenGap}px` : undefined,
					color: !!color ? color : undefined,
				}}
			>
				{childrenAlign == "start" && (
					<>
						{children}
						{line}
					</>
				)}
				{childrenAlign == "center" && (
					<>
						{line}
						{children}
						{line}
					</>
				)}
				{childrenAlign == "end" && (
					<>
						{line}
						{children}
					</>
				)}
			</div>
		);
	} else {
		row = line;
	}

	return (
		<div
			className={classNames("iui:flex iui:text-front-hint", {
				"iui:flex-row iui:items-center iui:w-full iui:min-w-full":
					orientation == "horizontal",
				"iui:flex-col iui:items-center iui:h-full iui:min-h-full":
					orientation == "vertical",
			})}
			style={{
				paddingTop:
					!!indent && orientation == "vertical" ? `${indent}px` : undefined,
				paddingLeft:
					!!indent && orientation == "horizontal" ? `${indent}px` : undefined,
				paddingBottom:
					!!indent && orientation == "vertical" ? `${endIndent}px` : undefined,
				paddingRight:
					!!indent && orientation == "horizontal"
						? `${endIndent}px`
						: undefined,
			}}
		>
			{row}
		</div>
	);
};

export default Divider;
