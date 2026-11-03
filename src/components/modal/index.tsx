import classnames from "classnames";
import React, { useRef } from "react";
import CloseIcon from "../../icons/close-icon";
import IconButton from "../icon-button";
import { OverlayChildrenProps } from "../overlay";
import { ConfirmPopupProps, useConfirmPopup } from "../popup/confirm";
import Window from "../window";

type ModalScrollType = "paper" | "body";

export interface ModalProps {
	children:
		| string
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	title?: string | React.ReactElement;

	show: boolean;
	onClose: () => void;

	scrollType?: ModalScrollType;
	closeConfirmPopup?: ConfirmPopupProps;
}

const Modal = ({
	children,
	title,
	show,
	scrollType = "paper",
	closeConfirmPopup,
	onClose,
}: ModalProps) => {
	const el = (props: OverlayChildrenProps) => {
		if (typeof children === "function") {
			return children(props);
		}

		return children as React.ReactElement;
	};

	const ref = useRef(null);

	const showConfirmPopup = useConfirmPopup();

	const handleBackdropClick = async () => {
		if (closeConfirmPopup) {
			const result = await showConfirmPopup(closeConfirmPopup);

			if (!result) {
				return;
			}
		}

		onClose();
	};

	return (
		<Window show={show} onClose={onClose} onBackdropClick={handleBackdropClick}>
			{({ close }) => {
				return (
					<div
						className={classnames(
							"iui:flex iui:flex-col iui:bg-background iui:rounded-modal iui:shadow-modal iui:m-5",
							{
								"iui:max-h-full": scrollType == "paper",
								"iui:flex-1": scrollType == "body",
							}
						)}
					>
						{title && (
							<div className="iui:flex iui:flex-row iui:items-center iui:justify-between">
								<div className="iui:font-medium iui:text-xl iui:p-4 iui:mr-2">
									{title}
								</div>
								<div className="iui:p-1">
									<IconButton
										size="large"
										type="light-borderless"
										icon={<CloseIcon />}
										onClick={close}
									></IconButton>
								</div>
							</div>
						)}

						<div
							className={classnames(
								"iui:flex iui:flex-col iui:px-4 iui:pb-4 iui:flex-1",
								{
									"iui:pt-4": !title,
								}
							)}
						>
							{el({ close })}
						</div>
					</div>
				);
			}}
		</Window>
	);
};

export default Modal;
