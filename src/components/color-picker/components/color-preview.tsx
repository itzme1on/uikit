import { hexToHsva, hsvaToHex } from "@uiw/color-convert";
import React from "react";
import { isHexColor } from "../../../utils/colors";

interface Props {
	color: string;
	showAlpha?: boolean;
}

const ColorPreview = ({ color, showAlpha = false }: Props) => {
	const hsvaColor = hexToHsva(isHexColor(color) ? color : "#ff0000");
	const colorWithoutAlpha = hsvaToHex(hsvaColor);

	return (
		<div className="iui:flex iui:flex-col iui:aspect-square iui:w-6 iui:h-6 iui:border iui:border-stroke iui:overflow-hidden iui:rounded-md">
			<div
				className="iui:w-full iui:flex-1"
				style={{
					backgroundColor: colorWithoutAlpha,
				}}
			></div>
			{showAlpha && (
				<div
					className="iui:w-full iui:flex-1"
					style={{
						backgroundColor: color,
					}}
				></div>
			)}
		</div>
	);
};

export default ColorPreview;
