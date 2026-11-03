import React from "react";

export interface LabelProps
	extends Omit<React.HTMLProps<HTMLLabelElement>, "label"> {
	label: string | React.ReactElement;
	children: React.ReactElement;
}

const Label = ({ children, label, ...restProps }: LabelProps) => {
	return (
		<div className="iui:flex iui:flex-col iui:gap-2">
			<label
				{...restProps}
				className="iui:flex iui:flex-row iui:items-center iui:font-medium"
			>
				{label}
			</label>

			{children}
		</div>
	);
};

export default Label;
