import classNames from "classnames";
import React from "react";
import { ControlsProps } from "../../common/controls.type";

interface Props extends Pick<ControlsProps, "disabled"> {
	value: boolean;
	onChange: (status: boolean) => void;
}

const Switch = ({ value, onChange, disabled }: Props) => {
	const handleClick = () => {
		if (disabled) return;

		onChange(!value);
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				" iui:w-10 iui:h-10 iui:aspect-square iui:flex iui:flex-col iui:items-center iui:justify-center iui:shrink iui:cursor-pointer",
				{
					"iui:opacity-50 iui:cursor-not-allowed": disabled,
				}
			)}
		>
			<div
				className={classNames(
					"iui:relative iui:w-10 iui:h-6 iui:rounded-full iui:transition-all iui:duration-300",
					{
						"iui:bg-primary": value,
						"iui:bg-stroke": !value,
					}
				)}
			>
				<div
					className={classNames(
						"iui:absolute iui:aspect-square iui:w-5 iui:h-5 iui:mt-0.5 iui:rounded-full iui:transition-all iui:duration-300",
						{
							"iui:ml-[18px] iui:bg-primary-front": value,
							"iui:ml-0.5 iui:bg-background": !value,
						}
					)}
				></div>
			</div>
		</div>
	);
};

export default Switch;
