import classnames from "classnames";
import React, { ReactElement } from "react";
import { ControlStatusProps } from "../../common/controls.type";
import CheckIcon from "../../icons/check-icon";
import CloseIcon from "../../icons/close-icon";
import ExclamationIcon from "../../icons/exclamation-icon";
import InfoIcon from "../../icons/info-icon";
import Button, { ButtonProps } from "../button";
import Icon from "../icon";
import { OverlayChildrenProps } from "../overlay";
import Window from "../window";

export type OnPopupClose<T = any> = (result?: T) => void;

export type PopupButtons<T = any> =
	| ButtonProps[]
	| ((close: OnPopupClose<T>) => ButtonProps[]);
export type PopupButtonsDirection = "vertical" | "horizontal";

export interface PopupProps<T = any> extends ControlStatusProps {
	title?: string | React.ReactElement;
	titleAlign?: "start" | "center" | "end";
	children:
		| string
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	buttons?: PopupButtons<T>;
	buttonsDirection?: PopupButtonsDirection;
	show?: boolean;
	onClose?: OnPopupClose;

	danger?: boolean;
	info?: boolean;
}

const Popup = ({
	show = true,
	onClose = (result) => {},
	title,
	titleAlign = "center",
	children,
	buttons = [],
	buttonsDirection = "horizontal",
	success,
	error,
	warning,
	danger,
	info,
}: PopupProps) => {
	const status = error
		? "error"
		: success
		? "success"
		: warning
		? "warning"
		: danger
		? "danger"
		: info
		? "info"
		: "default";

	let buttonsArray = Array.isArray(buttons) ? buttons : buttons(onClose);

	if (buttonsArray.length > 2 || buttonsArray.length == 1) {
		buttonsDirection = "vertical";
	}

	if (buttonsDirection == "horizontal") {
		buttonsArray = buttonsArray.reverse();
	}

	let icon: ReactElement | undefined;

	const el = (props: OverlayChildrenProps) => {
		if (typeof children === "function") {
			return children(props);
		}

		if (typeof children == "string") {
			return (
				<div className="iui:flex iui:flex-col iui:text-center">{children}</div>
			);
		}

		return children as React.ReactElement;
	};

	switch (status) {
		case "danger":
		case "warning":
			icon = <ExclamationIcon />;
			break;
		case "error":
			icon = <CloseIcon />;
			break;
		case "success":
			icon = <CheckIcon />;
			break;
		case "info":
			icon = <InfoIcon />;
			break;
	}

	return (
		<Window show={show} onClose={onClose}>
			{(overlayProps) => {
				return (
					<div
						className={classnames(
							"iui:flex iui:flex-col iui:min-w-full iui:w-80 iui:max-w-full iui:bg-background iui:rounded-modal iui:shadow-modal iui:p-6 iui:gap-5"
						)}
					>
						{icon && (
							<div className="iui:flex iui:flex-row iui:items-center iui:justify-center">
								<div
									className={classnames(
										"iui:w-16 iui:h-16 iui:rounded-full iui:fill-current iui:flex iui:items-center iui:justify-center",
										{
											"iui:text-primary iui:bg-primary-plain": info,
											"iui:text-success iui:bg-success-plain": success,
											"iui:text-error iui:bg-error-plain": error || danger,
											"iui:text-warning iui:bg-warning-plain": warning,
										}
									)}
								>
									<Icon size="huge" icon={icon}></Icon>
								</div>
							</div>
						)}

						<div className="iui:flex iui:flex-col iui:gap-2">
							{title && (
								<div
									className={classnames("iui:font-medium iui:text-xl", {
										"iui:text-start": titleAlign == "start",
										"iui:text-center": titleAlign == "center",
										"iui:text-end": titleAlign == "end",
									})}
								>
									{title}
								</div>
							)}

							{el({
								...overlayProps,
								close: onClose,
							})}
						</div>

						{buttonsArray.length > 0 && (
							<div
								className={classnames("iui:grid iui:gap-4", {
									"iui:grid-cols-1": buttonsDirection == "vertical",
									"iui:grid-cols-2": buttonsDirection == "horizontal",
								})}
							>
								{buttonsArray.map((button, index) => (
									<Button key={index} {...button} />
								))}
							</div>
						)}
					</div>
				);
			}}
		</Window>
	);
};

export default Popup;
