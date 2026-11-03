import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Backdrop from "../backdrop";
import Overlay, { OverlayChildrenProps } from "../overlay";

export interface WindowProps {
	children:
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	show: boolean;
	onClose: <T>(result?: T) => void;
	onBackdropClick?: <T>(result?: T) => void;
}

const Window = ({ children, show, onClose, onBackdropClick }: WindowProps) => {
	const [isVisible, setIsVisible] = useState(show);

	useEffect(() => {
		if (show) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [show]);

	const handleOverlayVisibleChange = (visible: boolean) => {
		if (!visible) {
			onClose();
		}
	};

	const el = (props: OverlayChildrenProps) => {
		if (typeof children === "function") {
			return children(props);
		}

		return children as React.ReactElement;
	};

	return (
		<Overlay visible={isVisible} onVisibleChange={handleOverlayVisibleChange}>
			{({ close }) => (
				<Backdrop
					className={show ? "iui:animate-fade-in" : "iui:animate-fade-out"}
					onClick={onBackdropClick ?? close}
				>
					<div
						className={classNames(
							"iui:flex iui:flex-col iui:my-auto",
							show ? "iui:animate-scale-in" : "iui:animate-scale-out"
						)}
					>
						{el({ close })}
					</div>
				</Backdrop>
			)}
		</Overlay>
	);
};

export default Window;
