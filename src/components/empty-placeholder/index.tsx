import React, { ReactElement } from "react";
import Icon, { IconProp } from "../icon";

interface Props {
	icon?: IconProp;
	children?: string | ReactElement | ReactElement[];
	action?: ReactElement | ReactElement[];
}

const EmptyPlaceholder = ({ icon, children, action }: Props) => {
	return (
		<div className="iui:flex iui:flex-col iui:gap-5 iui:items-center iui:justify-center iui:px-4">
			{icon && (
				<span className="iui:text-front-hint">
					<Icon icon={icon} size="huge" />
				</span>
			)}

			<div className="iui:text-front-secondary iui:text-center iui:max-w-md">
				{children}
			</div>

			{action && <div className="iui:flex iui:flex-col iui:gap-2">{action}</div>}
		</div>
	);
};

export default EmptyPlaceholder;
