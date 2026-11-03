import React, { useState } from "react";
import Button from "../../button";
import ColorPickerPalette from "./palette";

interface Props {
	value?: string;
	onSubmit: (value: string) => void;
	okayButtonText?: string;
}

const ColorPickerForm = ({ value, onSubmit, okayButtonText }: Props) => {
	const [color, setColor] = useState(value ?? "#ff0000");
	const handleSubmit = () => {
		onSubmit(color);
	};

	return (
		<div className="iui:flex iui:w-full iui:flex-col iui:gap-4">
			<ColorPickerPalette color={color} onChange={setColor} />
			<Button type="primary" onClick={handleSubmit}>
				{okayButtonText}
			</Button>
		</div>
	);
};

export default ColorPickerForm;
