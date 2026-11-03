import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";

interface SliderThumbProps {
	showOnHover?: boolean;
	size?: number;
	customThumb?: React.ReactNode | React.JSX.Element;
}

interface SliderProps {
	min?: number;
	max?: number;
	value: number;
	step?: number;
	onChange: (value: number) => void;
	disabled?: boolean;
	thumbProps?: SliderThumbProps;
}

const SliderThumb: React.FC<SliderThumbProps> = ({
	showOnHover,
	size,
	customThumb,
}) => {
	const hasCustomThumb = !!customThumb;

	if (hasCustomThumb) {
		return <>{customThumb}</>;
	}

	const hasSize = !!size;
	const sizeStyle = hasSize ? { width: `${size}px`, height: `${size}px` } : {};

	return (
		<div
			className={classnames(
				"iui:rounded-full iui:border-2 iui:border-primary iui:bg-background",
				{
					"iui:w-5 iui:h-5": !hasSize,
				}
			)}
			style={sizeStyle}
		></div>
	);
};

const Slider = ({
	min = 0,
	max = 100,
	value,
	step = 1,
	onChange,
	disabled,
	thumbProps,
}: SliderProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const showThumbOnHover = thumbProps?.showOnHover;

	const saveRange = (value: number) => {
		if (value < min) {
			return min;
		}

		if (value > max) {
			return max;
		}

		return value;
	};

	const updateValue = (x: number) => {
		if (disabled) {
			return;
		}

		const sliderEl = sliderRef.current;

		if (!sliderEl) {
			return;
		}
		const sliderWidth = sliderEl.offsetWidth;

		const percentage = (x / sliderWidth) * 100;

		let newValue = saveRange(
			Math.round(((max - min) * (percentage / 100)) / step) * step + min
		);

		onChange(newValue);
	};

	useEffect(() => {
		const sliderEl = sliderRef.current;

		if (sliderEl) {
			sliderEl.addEventListener("mousedown", handleMouseDown);
			sliderEl.addEventListener("touchstart", handleTouchStart);

			return () => {
				sliderEl.removeEventListener("mousedown", handleMouseDown);
				sliderEl.removeEventListener("touchstart", handleTouchStart);
			};
		}
	}, []);

	const handleMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent) => {
		event.preventDefault();

		const sliderEl = sliderRef.current;

		if (!sliderEl) {
			return;
		}

		const sliderLeft = sliderEl.getBoundingClientRect().left;
		const x = event.pageX - sliderLeft;

		updateValue(x);
	};

	const handleMouseUp = (event: MouseEvent) => {
		event.preventDefault();
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const handleTouchStart = (event: TouchEvent) => {
		event.preventDefault();
		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);
	};

	const handleTouchMove = (event: TouchEvent) => {
		event.preventDefault();

		const sliderEl = sliderRef.current;

		if (!sliderEl) {
			return;
		}

		const sliderLeft = sliderEl.getBoundingClientRect().left;
		const x = event.changedTouches[0].pageX - sliderLeft;

		updateValue(x);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		event.preventDefault();
		document.removeEventListener("touchmove", handleTouchMove);
		document.removeEventListener("touchend", handleTouchEnd);
	};

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();

		const sliderEl = sliderRef.current;

		if (!sliderEl) {
			return;
		}

		const sliderLeft = sliderEl.getBoundingClientRect().left;
		const x = event.pageX - sliderLeft;

		updateValue(x);
	};

	const handleTap = (event: TouchEvent) => {
		event.preventDefault();

		const sliderEl = sliderRef.current;

		if (!sliderEl) {
			return;
		}

		const sliderLeft = sliderEl.getBoundingClientRect().left;
		const x = event.touches[0].pageX - sliderLeft;

		updateValue(x);
	};

	// const percentage = ((sliderValue - min) / (max - min)) * 100;
	const v = saveRange(value);
	const percentage = ((v - min) / (max - min)) * 100;

	const [thumbLeftOffset, setThumbLeftOffet] = useState(0);

	useEffect(() => {
		const el = thumbRef.current;

		if (!el) {
			return;
		}

		const width = el.offsetWidth;
		const percent = width / 100;

		setThumbLeftOffet(-1 * percentage * percent);
	}, [thumbRef.current, value]);

	return (
		<div
			className={classnames(
				"iui:relative iui:flex iui:flex-col iui:w-full iui:justify-center iui:control-height-default",
				{
					"iui:cursor-pointer": !disabled,
					"iui:opacity-50": disabled,
					"iui:group/slider": showThumbOnHover,
				}
			)}
			onClick={handleClick}
			ref={sliderRef}
		>
			<div className="iui:flex iui:flex-col iui:w-full iui:bg-stroke iui:h-1 iui:rounded-full iui:overflow-hidden">
				<div
					className="iui:h-full iui:rounded-full iui:bg-primary"
					style={{ width: `${percentage}%` }}
				/>
			</div>

			<div
				ref={thumbRef}
				className={classnames(
					"iui:absolute iui:flex iui:items-center iui:justify-center iui:h-full",
					{
						"iui:scale-0 iui:pointer-events-none iui:transition-transform iui:duration-150 iui:group-hover/slider:scale-100 iui:group-hover/slider:pointer-events-auto iui:group-focus-within/slider:scale-100 iui:group-focus-within/slider:pointer-events-auto": showThumbOnHover,
					}
				)}
				style={{ left: `${percentage}%`, marginLeft: `${thumbLeftOffset}px` }}
			>
				<SliderThumb {...thumbProps} />
			</div>
		</div>
	);
};

export default Slider;
