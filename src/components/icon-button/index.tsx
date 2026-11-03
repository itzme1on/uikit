import classnames from "classnames";
import React from "react";
import { ControlsProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";
import Spinner from "../spinner";

type IconButtonType =
	| "default"
	| "primary"
	| "outline"
	| "plain"
	| "borderless"
	| "text"
	| "primary-borderless"
	| "primary-text"
	| "primary-light-borderless"
	| "primary-light-text"
	| "light-borderless"
	| "light-text";

interface IconButtonProps
	extends ControlsProps,
		Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
	type?: IconButtonType;

	loading?: boolean;
	htmlType?: "button" | "submit" | "reset";

	icon?: IconProp;
	children?: IconProp;
}

const IconButton = ({
	type = "default",
	size = "default",
	loading = false,
	disabled = false,
	error,
	success,
	warning,
	icon,
	children,
	htmlType = "button",
	...restProps
}: IconButtonProps) => {
	const status = error
		? "error"
		: success
		? "success"
		: warning
		? "warning"
		: "default";

	const isText = [
		"text",
		"primary-text",
		"light-text",
		"primary-light-text",
	].includes(type);

	return (
		<button
			type={htmlType}
			{...restProps}
			disabled={disabled || loading}
			className={classnames(
				"iui:rounded-control iui:flex iui:flex-row iui:items-center iui:justify-center iui:transition-all iui:duration-200",
				{
					// Not text
					"iui:aspect-square": !isText,

					// Type
					"iui:bg-background iui:border": type == "default" || type == "outline",

					// Default state
					"iui:text-front iui:fill-front iui:border-stroke":
						status == "default" &&
						(type == "default" || type == "borderless" || type == "text"),
					"iui:hover:bg-background-hover iui:active:bg-background-active":
						status == "default" && type == "default",
					"iui:text-primary-front iui:fill-primary-front iui:bg-primary iui:hover:bg-primary-accent-hover iui:active:bg-primary-accent-active":
						status == "default" && type == "primary",
					"iui:text-primary iui:fill-primary iui:border-primary iui:hover:bg-primary-hover iui:active:bg-primary-active":
						status == "default" && type == "outline",
					"iui:text-primary iui:fill-primary iui:bg-primary-plain iui:hover:bg-primary-plain-hover iui:active:bg-primary-plain-active":
						status == "default" && type == "plain",
					"iui:text-primary iui:fill-primary iui:hover:text-primary-accent-hover iui:hover:fill-primary-accent-hover iui:active:text-primary-accent-active iui:active:fill-primary-accent-active":
						status == "default" &&
						(type == "primary-borderless" || type == "primary-text"),
					"iui:text-front-hint iui:fill-front-hint iui:hover:text-front iui:hover:fill-front iui:active:text-front iui:active:fill-front":
						status == "default" &&
						(type == "light-borderless" || type == "light-text"),
					"iui:text-primary-light iui:fill-primary-light iui:hover:text-primary iui:hover:fill-primary iui:active:text-primary-accent-active iui:active:fill-primary-accent-active":
						status == "default" &&
						(type == "primary-light-borderless" ||
							type == "primary-light-text"),

					// Error state
					"iui:text-error iui:fill-error iui:border-error-light iui:hover:bg-error-hover iui:active:bg-error-active":
						status == "error" && type == "default",
					"iui:text-error iui:fill-error iui:border-error iui:hover:bg-error-hover iui:active:bg-error-active":
						status == "error" && type == "outline",
					"iui:text-error-front iui:fill-error-front iui:bg-error iui:hover:bg-error-accent-hover iui:active:bg-error-accent-active":
						status == "error" && type == "primary",
					"iui:text-error iui:fill-error iui:bg-error-plain iui:hover:bg-error-plain-hover iui:active:bg-error-plain-active":
						status == "error" && type == "plain",
					"iui:text-error iui:fill-error iui:hover:text-error-accent-hover iui:hover:fill-error-accent-hover iui:active:text-error-accent-active iui:active:fill-error-accent-active":
						status == "error" &&
						(type == "text" ||
							type == "borderless" ||
							type == "primary-borderless" ||
							type == "primary-text" ||
							type == "primary-light-borderless" ||
							type == "primary-light-text"),
					"iui:text-front-hint iui:fill-front-hint iui:hover:text-error-accent-hover iui:hover:fill-error-accent-hover iui:active:text-error-accent-active iui:active:fill-error-accent-active":
						status == "error" &&
						(type == "light-borderless" || type == "light-text"),

					// Warning state
					"iui:text-warning iui:fill-warning iui:border-warning-light iui:hover:bg-warning-hover iui:active:bg-warning-active":
						status == "warning" && type == "default",
					"iui:text-warning iui:fill-warning iui:border-warning iui:hover:bg-warning-hover iui:active:bg-warning-active":
						status == "warning" && type == "outline",
					"iui:text-warning-front iui:fill-warning-front iui:bg-warning iui:hover:bg-warning-accent-hover iui:active:bg-warning-accent-active":
						status == "warning" && type == "primary",
					"iui:text-warning iui:fill-warning iui:bg-warning-plain iui:hover:bg-warning-plain-hover iui:active:bg-warning-plain-active":
						status == "warning" && type == "plain",
					"iui:text-warning iui:fill-warning iui:hover:text-warning-accent-hover iui:hover:fill-warning-accent-hover iui:active:text-warning-accent-active iui:active:fill-warning-accent-active":
						status == "warning" &&
						(type == "text" ||
							type == "borderless" ||
							type == "primary-borderless" ||
							type == "primary-text" ||
							type == "primary-light-borderless" ||
							type == "primary-light-text"),
					"iui:text-front-hint iui:fill-front-hint iui:hover:text-warning-accent-hover iui:hover:fill-warning-accent-hover iui:active:text-warning-accent-active iui:active:fill-warning-accent-active":
						status == "warning" &&
						(type == "light-borderless" || type == "light-text"),

					// Success state
					"iui:text-success iui:fill-success iui:border-success-light iui:hover:bg-success-hover iui:active:bg-success-active":
						status == "success" && type == "default",
					"iui:text-success iui:fill-success iui:border-success iui:hover:bg-success-hover iui:active:bg-success-active":
						status == "success" && type == "outline",
					"iui:text-success-front iui:fill-success-front iui:bg-success iui:hover:bg-success-accent-hover iui:active:bg-success-accent-active":
						status == "success" && type == "primary",
					"iui:text-success iui:fill-success iui:bg-success-plain iui:hover:bg-success-plain-hover iui:active:bg-success-plain-active":
						status == "success" && type == "plain",
					"iui:text-success iui:fill-success iui:hover:text-success-accent-hover iui:hover:fill-success-accent-hover iui:active:text-success-accent-active iui:active:fill-success-accent-active":
						status == "success" &&
						(type == "text" ||
							type == "borderless" ||
							type == "primary-borderless" ||
							type == "primary-text" ||
							type == "primary-light-borderless" ||
							type == "primary-light-text"),
					"iui:text-front-hint iui:fill-front-hint iui:hover:text-success-accent-hover iui:hover:fill-success-accent-hover iui:active:text-success-accent-active iui:active:fill-success-accent-active":
						status == "success" &&
						(type == "light-borderless" || type == "light-text"),

					// Size
					"iui:icon-control-size-large": !isText && size == "large",
					"iui:icon-control-size-medium": !isText && size == "medium",
					"iui:icon-control-size-default": !isText && size == "default",
					"iui:icon-control-size-small": !isText && size == "small",
					"iui:icon-control-size-mini": !isText && size == "mini",

					// Loading | Disabled
					"iui:opacity-50": loading || disabled,
					"iui:cursor-pointer": !loading && !disabled,

					// Loading
					"iui:cursor-wait": loading,

					// Disabled
					"iui:cursor-not-allowed": disabled,
				},
				restProps.className
			)}
		>
			{loading && <Spinner size={size} />}

			{!loading && <Icon size={size} icon={children ?? icon}></Icon>}
		</button>
	);
};

export default IconButton;
