import classnames from "classnames";
import React from "react";
import { ControlsProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";
import Spinner from "../spinner";

type ButtonType =
	| "default"
	| "primary"
	| "outline"
	| "plain"
	| "borderless"
	| "text";

export interface ButtonProps
	extends ControlsProps, Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
	type?: ButtonType;
	htmlType?: "button" | "submit" | "reset";

	loading?: boolean;

	children?: string | string[] | React.ReactElement;

	icon?: IconProp;
	suffixIcon?: IconProp;
}

const Button = ({
	type = "default",
	size = "default",
	loading,
	disabled,
	success,
	error,
	warning,
	children,
	icon,
	suffixIcon,
	htmlType = "button",
	...restProps
}: ButtonProps) => {
	const status = error
		? "error"
		: success
			? "success"
			: warning
				? "warning"
				: "default";

	return (
		<button
			type={htmlType}
			disabled={disabled || loading}
			{...restProps}
			className={classnames(
				restProps.className,
				"iui:rounded-control iui:flex iui:flex-row iui:items-center iui:justify-center iui:gap-2 iui:transition-all iui:duration-200 iui:text-ellipsis iui:whitespace-nowrap iui:select-none",
				{
					// Not text
					"iui:px-5": type != "text",

					// Type
					"iui:bg-background iui:border": type == "default" || type == "outline",

					// Default state
					"iui:text-front iui:fill-front iui:border-stroke iui:hover:bg-background-hover iui:active:bg-background-active":
						status == "default" && type == "default",
					"iui:text-primary-front iui:fill-primary-front iui:bg-primary iui:hover:bg-primary-accent-hover iui:active:bg-primary-accent-active":
						status == "default" && type == "primary",
					"iui:text-primary iui:fill-primary iui:border-primary iui:hover:bg-primary-hover iui:active:bg-primary-active":
						status == "default" && type == "outline",
					"iui:text-primary iui:fill-primary iui:bg-primary-plain  iui:hover:bg-primary-plain-hover iui:active:bg-primary-plain-active":
						status == "default" && type == "plain",
					"iui:text-primary iui:fill-primary iui:hover:text-primary-accent-hover iui:hover:fill-primary-accent-hover iui:active:text-primary-accent-active iui:active:fill-primary-accent-active":
						status == "default" && (type == "text" || type == "borderless"),

					// Error state
					"iui:text-error iui:fill-error iui:border-error-light iui:hover:bg-error-hover iui:active:bg-error-active":
						status == "error" && type == "default",
					"iui:text-error iui:fill-error iui:border-error iui:hover:bg-error-hover iui:active:bg-error-active":
						status == "error" && type == "outline",
					"iui:text-error-front iui:fill-error-front iui:bg-error iui:hover:bg-error-accent-hover iui:active:bg-error-accent-active":
						status == "error" && type == "primary",
					"iui:text-error iui:fill-error iui:bg-error-plain  iui:hover:bg-error-plain-hover iui:active:bg-error-plain-active":
						status == "error" && type == "plain",
					"iui:text-error iui:fill-error iui:hover:text-error-accent-hover iui:hover:fill-error-accent-hover iui:active:text-error-accent-active iui:active:fill-error-active":
						status == "error" && (type == "text" || type == "borderless"),

					// Warning state
					"iui:text-warning iui:fill-warning iui:border-warning-light iui:hover:bg-warning-hover iui:active:bg-warning-active":
						status == "warning" && type == "default",
					"iui:text-warning iui:fill-warning iui:border-warning iui:hover:bg-warning-hover iui:active:bg-warning-active":
						status == "warning" && type == "outline",
					"iui:text-warning-front iui:fill-warning-front iui:bg-warning iui:hover:bg-warning-accent-hover iui:active:bg-warning-accent-active":
						status == "warning" && type == "primary",
					"iui:text-warning iui:fill-warning iui:bg-warning-plain  iui:hover:bg-warning-plain-hover iui:active:bg-warning-plain-active":
						status == "warning" && type == "plain",
					"iui:text-warning iui:fill-warning iui:hover:text-warning-accent-hover iui:hover:fill-warning-accent-hover iui:active:text-warning-accent-active iui:active:fill-warning-active":
						status == "warning" && (type == "text" || type == "borderless"),

					// Success state
					"iui:text-success iui:fill-success iui:border-success-light iui:hover:bg-success-hover iui:active:bg-success-active":
						status == "success" && type == "default",
					"iui:text-success iui:fill-success iui:border-success iui:hover:bg-success-hover iui:active:bg-success-active":
						status == "success" && type == "outline",
					"iui:text-success-front iui:fill-success-front iui:bg-success iui:hover:bg-success-accent-hover iui:active:bg-success-accent-active":
						status == "success" && type == "primary",
					"iui:text-success iui:fill-success iui:bg-success-plain  iui:hover:bg-success-plain-hover iui:active:bg-success-plain-active":
						status == "success" && type == "plain",
					"iui:text-success iui:fill-success iui:hover:text-success-accent-hover iui:hover:fill-success-accent-hover iui:active:text-success-accent-active iui:active:fill-success-active":
						status == "success" && (type == "text" || type == "borderless"),

					// Size
					"iui:control-height-large": type != "text" && size == "large",
					"iui:control-height-medium": type != "text" && size == "medium",
					"iui:control-height-default": type != "text" && size == "default",
					"iui:control-height-small": type != "text" && size == "small",
					"iui:control-height-mini": type != "text" && size == "mini",

					// Loading | Disabled
					"iui:opacity-50": loading || disabled,
					"iui:cursor-pointer": !loading && !disabled,

					// Loading
					"iui:cursor-wait": loading,

					// Disabled
					"iui:cursor-not-allowed": disabled,
				}
			)}
		>
			{loading && <Icon icon={<Spinner size="small"></Spinner>} />}

			{!loading && <Icon icon={icon} />}

			{children}

			<Icon icon={suffixIcon} />
		</button>
	);
};

export default Button;
