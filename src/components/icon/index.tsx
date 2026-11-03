import classnames from "classnames";
import React from "react";
import { ControlSize } from "../../common/controls.type";

export type IconProp =
	| string
	| React.JSX.Element
	| React.ReactNode
	| React.ReactElement;

interface Props {
	icon?: IconProp;
	color?: string;
	size?: ControlSize | "huge";
}

const Icon = ({ icon, size = "default", color }: Props) => {
	if (!icon) {
		return null;
	}

	let el: React.JSX.Element | React.ReactNode | React.ReactElement;

	if (typeof icon === "string") {
		el = <i className={classnames(icon)}></i>;
	} else {
		el = icon;
	}

	return (
		<div
			className={classnames(
				"iui:icon iui:flex iui:items-center iui:justify-center iui:leading-none",
				{
					"iui:fill-current iui:text-current": !color,
					"iui:w-14 iui:h-14 iui:text-5xl": size == "huge",
					"iui:w-6 iui:h-6 iui:text-2xl": size == "large",
					"iui:w-5 iui:h-5 iui:text-xl":
						size == "medium" || size == "default" || size == "small",
					"iui:w-4 iui:h-4 iui:text-base": size == "mini",
				}
			)}
			style={{
				color: color,
				fill: color,
			}}
		>
			{el}
		</div>
	);
};
export default Icon;
