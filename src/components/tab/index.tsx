import classNames from "classnames";
import React, { ReactElement } from "react";
import { ControlsProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";
import { TabUnderlineStyle } from "../tabs";

export interface TabProps extends Omit<ControlsProps, "size"> {
	icon?: IconProp;
	suffixIcon?: IconProp;

	prefix?: ReactElement;
	suffix?: ReactElement;

	label: string | IconProp | ReactElement;
	children: ReactElement;

	active?: boolean;
	onClick?: () => void;

	expanded?: boolean;
	underlineStyle?: TabUnderlineStyle;
}

const Tab = ({
	label,
	icon,
	suffixIcon,
	prefix,
	suffix,
	active,
	disabled,
	onClick,
	expanded,
	underlineStyle,
}: TabProps) => {
	const handleClick = () => {
		if (disabled || !onClick) {
			return;
		}

		onClick();
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				"iui:group iui:relative iui:flex iui:flex-row iui:items-center iui:justify-center iui:h-14 iui:gap-2 iui:px-3",
				{
					"iui:w-full iui:flex-1": expanded,
					"iui:opacity-50 iui:pointer-events-none": disabled,
					"iui:cursor-pointer": !disabled,
					"iui:text-front-secondary iui:hover:text-front": !active,
				}
			)}
		>
			{prefix}
			{icon && <Icon icon={icon} />}

			<span className={classNames("iui:whitespace-nowrap iui:font-medium")}>
				{label}
			</span>

			{suffixIcon && <Icon icon={suffixIcon} />}
			{suffix}

			<div
				className={classNames(
					"iui:absolute iui:bottom-0 iui:h-0.5 iui:rounded-xs iui:rounded-bl-none iui:rounded-br-none",
					{
						"iui:left-1/2 iui:-translate-x-1/2 iui:w-5":
							underlineStyle == "default" || underlineStyle == undefined,
						"iui:left-3 iui:right-3": underlineStyle == "full-width",
						"iui:bg-primary": active,
						"iui:bg-transparent iui:group-hover:bg-stroke": !active,
					}
				)}
			></div>
		</div>
	);
};

export default Tab;
