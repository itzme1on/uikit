import classnames from "classnames";
import React from "react";
import { ControlStatusProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";

interface Props extends ControlStatusProps {
	title?: string | React.ReactNode | React.ReactElement;
	children?: string | React.ReactNode | React.ReactElement;

	icon?: IconProp;
	suffix?: string | React.JSX.Element | React.ReactNode | React.ReactElement;
}

const Alert = ({
	title,
	children,
	icon,
	suffix,
	success,
	warning,
	error,
}: Props) => {
	const isDefault = !success && !warning && !error;

	return (
		<div
			className={classnames(
				"iui:flex iui:flex-row iui:items-center iui:justify-start iui:p-4 iui:gap-3 iui:rounded-control",
				{
					"iui:bg-background iui:border iui:border-stroke": isDefault,
					"iui:text-success iui:bg-success-plain": success,
					"iui:text-error iui:bg-error-plain": error,
					"iui:text-warning iui:bg-warning-plain": warning,
				}
			)}
		>
			{icon && (
				<div
					className={classnames("iui:flex iui:items-center iui:justify-center", {
						"iui:text-front-hint iui:fill-front-hint": isDefault,
						"iui:text-success iui:fill-success": success,
						"iui:text-error iui:fill-error": error,
						"iui:text-warning iui:fill-warning": warning,
					})}
				>
					<Icon icon={icon} size="large" />
				</div>
			)}

			<div className="iui:flex iui:flex-col iui:flex-1">
				{title && <div className="iui:font-medium">{title}</div>}
				{children && <div className="iui:flex iui:flex-col">{children}</div>}
			</div>

			{suffix && <div>{suffix}</div>}
		</div>
	);
};

export default Alert;
