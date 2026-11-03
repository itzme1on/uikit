import classnames from "classnames";
import React from "react";

export interface HelperProps {
	children: React.ReactElement;
	text?: string | React.ReactElement;
	error?: string | React.ReactElement;
	suffix?: string | React.ReactElement;
}

const Helper = ({ children, text, error, suffix }: HelperProps) => {
	const content = error ?? text;
	const hasContent = !!content;
	const hasSuffix = !!suffix;
	const hasError = !!error;

	const showHelper = hasContent || hasSuffix;

	return (
		<div className="iui:flex iui:flex-col iui:gap-1">
			{children}

			{showHelper && (
				<div
					className={classnames(
						"iui:flex iui:flex-row iui:text-xs iui:items-center iui:justify-between iui:gap-1",
						{
							"iui:text-front-hint iui:fill-front-hint": !hasError,
							"iui:text-error iui:fill-error": hasError,
						}
					)}
				>
					{hasContent && (
						<div className="iui:flex iui:flex-row iui:items-center iui:gap-1">
							{content}
						</div>
					)}

					{hasSuffix && (
						<div className="iui:flex iui:flex-row iui:items-center">{suffix}</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Helper;
