import React from "react";

import Popover, { PopoverProps } from "../popover";

interface Props extends Omit<PopoverProps, "popoverClassName"> {}

const Dropdown = (props: Props) => {
	return (
		<Popover
			{...props}
			popoverClassName="iui:flex iui:flex-col iui:border iui:border-stroke iui:bg-background iui:rounded-control iui:overflow-hidden"
		/>
	);
};

export default Dropdown;
