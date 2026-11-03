import React from "react";

import HoverPopover, { HoverPopoverProps } from "../hover-popover";

interface Props
	extends Pick<
		HoverPopoverProps,
		"className" | "placement" | "openDelay" | "closeDelay"
	> {
	children: React.ReactNode | React.JSX.Element;
	content: React.ReactNode | React.JSX.Element;
}

const Tooltip = ({ content, children, ...restProps }: Props) => {
	return (
		<HoverPopover
			popoverClassName="iui:flex iui:flex-col iui:bg-black/70 iui:backdrop-blur-xs iui:text-white iui:px-2.5 iui:py-1 iui:rounded-control"
			button={children}
			{...restProps}
		>
			{content}
		</HoverPopover>
	);
};

export default Tooltip;
