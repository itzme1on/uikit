import classnames from "classnames";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { ControlSize, ControlsProps } from "../../common/controls.type";
import { useCombinedRefs } from "../../hooks/combinedrefs";
import CloseIcon from "../../icons/close-icon";
import EyeIcon from "../../icons/eye-icon";
import EyeSlashIcon from "../../icons/eye-slash-icon";
import Icon, { IconProp } from "../icon";
import IconButton from "../icon-button";

type PropPrependAppend = string | React.ReactElement;

export interface InputProps
	extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "prefix">,
		ControlsProps {
	value?: string;
	onDebounce?: (value: string) => void;

	debounceTimeout?: number;

	prepend?: PropPrependAppend;

	prefix?: string | React.ReactElement;
	prefixIcon?: IconProp;
	prefixText?: string;
	prefixPlaceholder?: string;

	suffixPlaceholder?: string;
	suffixText?: string;
	suffixIcon?: IconProp;
	suffix?: string | React.ReactElement;

	append?: PropPrependAppend;

	clearable?: boolean;
	togglePassword?: boolean;
	htmlSize?: number;

	fill?: boolean;
}

const InputIcon = ({
	icon,
	size,
	focus,
	success,
	error,
	warning,
	onClick,
}: {
	icon?: IconProp;
	focus: boolean;
	onClick?: () => void;
} & ControlsProps) => {
	if (!icon) {
		return null;
	}

	return (
		<div
			onClick={onClick}
			className={classnames("iui:cursor-text", {
				"iui:text-front-hint iui:fill-front-hint": !focus,
				"iui:text-primary iui:fill-primary": focus,
				"iui:text-error iui:fill-error": error,
				"iui:text-warning iui:fill-warning": warning,
				"iui:text-success iui:fill-success": success,
			})}
		>
			<Icon size={size} icon={icon}></Icon>
		</div>
	);
};

const InputPrefixSuffix = ({
	children,
	onClick,
}: {
	children?: string;
	onClick?: () => void;
}) => {
	if (!children || children.length == 0) {
		return null;
	}

	return (
		<div
			onClick={onClick}
			className="iui:text-front-hint iui:flex iui:flex-row iui:items-center iui:max-h-full iui:min-h-full iui:h-full iui:cursor-text iui:control-inject"
		>
			{children}
		</div>
	);
};

const InputPrefixSuffixPlaceholder = InputPrefixSuffix;
const InputPrefixSuffixText = InputPrefixSuffix;

const InputPrependAppend = ({
	children,
	type,
	focus,
}: {
	children?: PropPrependAppend;
	type: "prepend" | "append";
	focus: boolean;
}) => {
	if (!children || (typeof children === "string" && children.length == 0)) {
		return null;
	}

	return (
		<div
			className={classnames(
				"iui:flex iui:flex-row iui:max-h-full iui:min-h-full iui:h-full iui:items-center iui:transition-all",
				{
					"iui:border-r": type == "prepend",
					"iui:border-l": type == "append",

					"iui:border-stroke": !focus,
					"iui:border-primary": focus,
				}
			)}
		>
			{children}
		</div>
	);
};

interface InputPasswordToggleButtonProps {
	show: boolean;
	onChange: (status: boolean) => void;
	size: ControlSize;
}

const InputPasswordToggleButton = ({
	show,
	size,
	onChange,
}: InputPasswordToggleButtonProps) => {
	const toggle = () => {
		onChange(!show);
	};

	return (
		<IconButton
			size={size}
			type="primary-borderless"
			icon={show ? <EyeIcon /> : <EyeSlashIcon />}
			onClick={toggle}
		></IconButton>
	);
};

interface InputClearButtonProps {
	onClear: () => void;
	size: ControlSize;
}

const InputClearButton = ({ size, onClear }: InputClearButtonProps) => {
	return (
		<IconButton
			size={size}
			type="primary-borderless"
			icon={<CloseIcon />}
			onClick={onClear}
		></IconButton>
	);
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			value,
			onChange,
			onDebounce,
			debounceTimeout = 200,
			size = "default",
			disabled,
			success,
			warning,
			error,
			prepend,
			prefix,
			prefixIcon,
			prefixText,
			prefixPlaceholder,
			suffixPlaceholder,
			suffixText,
			suffixIcon,
			suffix,
			append,
			clearable,
			togglePassword,
			type,
			fill,
			htmlSize,
			...restProps
		},
		ref: React.Ref<HTMLInputElement>
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			if (onChange) {
				onChange(e);
			}

			handleDebounce(value);
		};

		const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

		const handleDebounce = (value: string) => {
			if (!onDebounce) {
				return;
			}

			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}

			debounceTimer.current = setTimeout(() => {
				onDebounce(value);
			}, debounceTimeout);
		};

		const inputZeroPaddingLeft =
			prefixPlaceholder && prefixPlaceholder.length > 0;
		const inputZeroPaddingRight =
			suffixPlaceholder && suffixPlaceholder.length > 0;

		const inputEl = useRef<HTMLInputElement>(null);
		const combinedRef = useCombinedRefs<HTMLInputElement>(inputEl, ref);

		const focusInput = () => inputEl.current?.focus();

		const [focus, setFocus] = useState(false);

		const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
			setFocus(true);
			if (restProps?.onFocus) {
				restProps?.onFocus(e);
			}
		};
		const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
			setFocus(false);
			if (restProps?.onBlur) {
				restProps?.onBlur(e);
			}
		};

		const isTogglePasswordButtonVisible = togglePassword && type == "password";

		const [currentType, setCurrentType] = useState(type);
		const isPasswordVisible = useMemo(
			() => currentType != "password",
			[currentType]
		);

		const onChangePasswordVisibility = (show: boolean) => {
			setCurrentType(show ? "text" : "password");
		};

		const isClearButtonVisible = useMemo(() => {
			return value != null && value.length > 0 && clearable;
		}, [value, clearable]);
		const clear = () => {
			if (inputEl.current) {
				inputEl.current.value = "";
				inputEl.current.dispatchEvent(new Event("change"));
			}
		};

		return (
			<div
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={classnames(
					restProps.className,
					"iui:editable-control-border iui:flex iui:flex-row iui:items-center iui:outline-hidden iui:ring-0",
					{
						"iui:editable-control-border-success": success && !error && !warning,
						"iui:editable-control-border-error": error && !warning,
						"iui:editable-control-border-warning": warning,

						"iui:opacity-50": disabled,
						"iui:editable-control-background": !fill,
						"iui:bg-stroke": fill,

						// Size
						"iui:control-height-large": size == "large",
						"iui:control-height-medium": size == "medium",
						"iui:control-height-default": size == "default",
						"iui:control-height-small": size == "small",
						"iui:control-height-mini": size == "mini",
					}
				)}
			>
				<InputPrependAppend type="prepend" focus={focus}>
					{prepend}
				</InputPrependAppend>

				{prefix}

				<div
					className={classnames(
						"iui:flex iui:flex-row iui:gap-3 iui:flex-1 iui:items-center iui:max-h-full iui:min-h-full iui:h-full",
						{
							"iui:pl-2": size == "mini" && !inputZeroPaddingLeft,
							"iui:pr-2": size == "mini" && !inputZeroPaddingRight,

							"iui:pl-2.5": size == "small" && !inputZeroPaddingRight,
							"iui:pr-2.5": size == "small" && !inputZeroPaddingRight,

							"iui:pl-3": size == "default" && !inputZeroPaddingRight,
							"iui:pr-3": size == "default" && !inputZeroPaddingRight,

							"iui:pl-3.5": size == "medium" && !inputZeroPaddingRight,
							"iui:pr-3.5": size == "medium" && !inputZeroPaddingRight,

							"iui:pl-4": size == "large" && !inputZeroPaddingRight,
							"iui:pr-4": size == "large" && !inputZeroPaddingRight,
						}
					)}
				>
					<InputIcon
						icon={prefixIcon}
						focus={focus}
						size={size}
						onClick={focusInput}
					/>

					<InputPrefixSuffixText onClick={focusInput}>
						{prefixText}
					</InputPrefixSuffixText>

					<div className="iui:flex iui:flex-row iui:flex-1 iui:max-h-full iui:min-h-full iui:h-full">
						<InputPrefixSuffixPlaceholder onClick={focusInput}>
							{prefixPlaceholder}
						</InputPrefixSuffixPlaceholder>

						<input
							ref={combinedRef}
							value={value}
							onChange={handleChange}
							type={currentType}
							{...restProps}
							onFocus={handleFocus}
							onBlur={handleBlur}
							size={htmlSize}
							className={classnames(
								"iui:text-front iui:rounded-control iui:flex-1 iui:max-h-full iui:min-h-full iui:h-full iui:outline-hidden iui:ring-0 iui:placeholder:text-front-hint iui:focus-visible:outline-hidden iui:focus-visible:ring-0 iui:w-0",
								{
									"iui:editable-control-background": !fill,
									"iui:bg-stroke": fill,
								}
							)}
							disabled={disabled}
						/>

						<InputPrefixSuffixPlaceholder onClick={focusInput}>
							{suffixPlaceholder}
						</InputPrefixSuffixPlaceholder>
					</div>

					<InputPrefixSuffixText onClick={focusInput}>
						{suffixText}
					</InputPrefixSuffixText>

					<InputIcon
						icon={suffixIcon}
						focus={focus}
						size={size}
						onClick={focusInput}
					/>
				</div>

				{isClearButtonVisible && (
					<InputClearButton size={size} onClear={clear} />
				)}
				{isTogglePasswordButtonVisible && (
					<InputPasswordToggleButton
						size={size}
						show={isPasswordVisible}
						onChange={onChangePasswordVisibility}
					></InputPasswordToggleButton>
				)}

				{suffix}

				<InputPrependAppend type="append" focus={focus}>
					{append}
				</InputPrependAppend>
			</div>
		);
	}
);

export default Input;
