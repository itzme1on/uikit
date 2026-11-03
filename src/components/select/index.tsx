import classnames from "classnames";
import React, {
	Ref,
	SelectHTMLAttributes,
	createContext,
	forwardRef,
	useContext,
	useMemo,
	useState,
} from "react";
import { ControlSize, ControlsProps } from "../../common/controls.type";
import Dropdown from "../dropdown";
import Icon, { IconProp } from "../icon";

interface SelectContextProps<T> {
	value: T;
	options: SelectOptionData<T>[];
	size?: ControlSize;
	onChange: (value?: T) => void;
	compareKey?: keyof NonNullable<T>;
}

const SelectContext = createContext<SelectContextProps<any>>({
	value: null,
	options: [],
	size: "default",
	onChange: () => {},
});

const useSelectContext = () => useContext(SelectContext);

type SelectType = "default" | "primary" | "plain" | "borderless" | "text";

interface Props<T>
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "size" | "onChange">,
		ControlsProps {
	value: T;
	onChange?: (event: React.ChangeEvent<{ value: T }>) => void;
	type?: SelectType;
	children:
		| React.ReactElement
		| React.ReactElement[]
		| React.JSX.Element
		| React.JSX.Element[];
	placeholder?: string;
	icon?: IconProp;
	compareKey?: keyof NonNullable<T>;
}

const Select = forwardRef(function <T>(
	props: Props<T>,
	ref: Ref<HTMLSelectElement>
) {
	const { children, value, onChange, size, disabled, compareKey } = props;

	const [open, setOpen] = useState(false);

	const hide = () => {
		setOpen(false);
	};

	const toggle = () => {
		setOpen(!open);
	};

	const options = useMemo(() => {
		const optionComponents: React.ReactElement<SelectOptionProps<T>>[] = [];

		React.Children.forEach(children, (child) => {
			if (
				React.isValidElement<SelectOptionProps<T>>(child) &&
				child.type === SelectOption
			) {
				optionComponents.push(child);
				return;
			}
		});

		return optionComponents.map((comp) => {
			const data: SelectOptionProps<T> = { ...comp.props };

			if (!data.label) {
				data.label = comp.props.children;
			}

			return data;
		});
	}, [children]);

	const handleChange = (value: T) => {
		hide();

		if (onChange) {
			const event = {
				target: {
					value,
				},
			} as React.ChangeEvent<{ value: T }>;

			onChange(event);
		}
	};

	return (
		<SelectContext.Provider
			value={{ value, options, size, onChange: handleChange, compareKey }}
		>
			<Dropdown
				button={
					<SelectButton
						{...props}
						onClick={toggle}
						open={open}
						disabled={disabled}
					></SelectButton>
				}
				show={open}
				onClickOutside={hide}
				minPopoverSize="button"
			>
				<div
					className={classnames("iui:max-h-80 iui:overflow-y-auto", {
						"iui:py-3": size == "large",
						"iui:py-2.5": size == "medium",
						"iui:py-2": size == "default",
						"iui:py-1.5": size == "small" || size == "mini",
					})}
				>
					<div className="iui:flex iui:flex-col iui:h-full">{children}</div>
				</div>
			</Dropdown>
		</SelectContext.Provider>
	);
}) as <T>(
	props: Props<T> & { ref?: Ref<HTMLSelectElement> }
) => React.ReactElement;

interface SelectButtonProps<T> extends Omit<Props<T>, "value" | "children"> {
	open?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
}

export function SelectButton<T>({
	type = "default",
	size = "default",
	placeholder,
	icon,
	success,
	warning,
	error,
	disabled,
	onClick,
	open = false,
	className,
}: SelectButtonProps<T>) {
	const status = error
		? "error"
		: success
		? "success"
		: warning
		? "warning"
		: "default";

	const { value, options, compareKey } = useSelectContext();

	let content;

	let selected = useMemo(() => {
		let item = options.find((el) => {
			if (compareKey) {
				return el.value?.[compareKey] == value?.[compareKey];
			}

			return el.value == value;
		});

		return item;
	}, [value, options]);

	if (!selected) {
		content = (
			<span
				className={classnames("iui:select-none", {
					"iui:text-front-hint":
						type == "default" || type == "borderless" || type == "text",
				})}
			>
				{placeholder}
			</span>
		);
	} else {
		content = selected.label ?? selected.value;
	}

	const handleClick = () => {
		if (disabled || !onClick) {
			return;
		}

		onClick();
	};

	return (
		<div
			onClick={handleClick}
			className={classnames(
				"iui:rounded-control iui:flex iui:flex-row iui:items-center iui:justify-start iui:transition-all iui:duration-200 iui:max-h-full",
				type != "text"
					? {
							"iui:px-3": size == "large",
							"iui:px-2.5": size == "medium",
							"iui:px-2": size == "default",
							"iui:px-1.5": size == "small" || size == "mini",
					  }
					: null,
				{
					// Type
					"iui:border iui:bg-background  iui:hover:bg-background-hover iui:active:bg-background-active":
						type == "default",

					// Default state
					"iui:text-front iui:fill-front iui:border-stroke":
						status == "default" &&
						(type == "default" || type == "text" || type == "borderless"),
					"iui:text-primary-front iui:fill-primary-front iui:bg-primary iui:hover:bg-primary-accent-hover iui:active:bg-primary-accent-active":
						status == "default" && type == "primary",
					"iui:text-primary iui:fill-primary iui:bg-primary-plain  iui:hover:bg-primary-plain-hover iui:active:bg-primary-plain-active":
						status == "default" && type == "plain",

					// Error state
					"iui:text-error iui:fill-error iui:border-error iui:hover:bg-error-hover iui:active:bg-error-active":
						status == "error" && type == "default",
					"iui:text-error-front iui:fill-error-front iui:bg-error iui:hover:bg-error-accent-hover iui:active:bg-error-accent-active":
						status == "error" && type == "primary",
					"iui:text-error iui:fill-error iui:bg-error-plain iui:hover:bg-error-plain-hover iui:active:bg-error-plain-active":
						status == "error" && type == "plain",
					"iui:text-error iui:fill-error iui:hover:text-error-accent-hover iui:hover:fill-error-accent-hover iui:active:text-error-accent-active iui:active:fill-error-active":
						status == "error" && (type == "text" || type == "borderless"),

					// Warning state
					"iui:text-warning iui:fill-warning iui:border-warning iui:hover:bg-warning-hover iui:active:bg-warning-active":
						status == "warning" && type == "default",
					"iui:text-warning-front iui:fill-warning-front iui:bg-warning iui:hover:bg-warning-accent-hover iui:active:bg-warning-accent-active":
						status == "warning" && type == "primary",
					"iui:text-warning iui:fill-warning iui:bg-warning-plain iui:hover:bg-warning-plain-hover iui:active:bg-warning-plain-active":
						status == "warning" && type == "plain",
					"iui:text-warning iui:fill-warning iui:hover:text-warning-accent-hover iui:hover:fill-warning-accent-hover iui:active:text-warning-accent-active iui:active:fill-warning-active":
						status == "warning" && (type == "text" || type == "borderless"),

					// Success state
					"iui:text-success iui:fill-success iui:border-success iui:hover:bg-success-hover iui:active:bg-success-active":
						status == "success" && type == "default",
					"iui:text-success-front iui:fill-success-front iui:bg-success iui:hover:bg-success-accent-hover iui:active:bg-success-accent-active":
						status == "success" && type == "primary",
					"iui:text-success iui:fill-success iui:bg-success-plain iui:hover:bg-success-plain-hover iui:active:bg-success-plain-active":
						status == "success" && type == "plain",
					"iui:text-success iui:fill-success iui:hover:text-success-accent-hover iui:hover:fill-success-accent-hover iui:active:text-success-accent-active iui:active:fill-success-active":
						status == "success" && (type == "text" || type == "borderless"),

					// Size
					"iui:control-height-large": type != "text" && size == "large",
					"iui:control-height-medium": type != "text" && size == "medium",
					"iui:control-height-default": type != "text" && size == "default",
					"iui:control-height-small": type != "text" && size == "small",
					"iui:control-height-mini": type != "text" && size == "mini",

					"iui:gap-3": size == "large",
					"iui:gap-2.5": size == "medium",
					"iui:gap-2": size == "default",
					"iui:gap-1.5": size == "small" || size == "mini",

					// Disabled
					"iui:cursor-not-allowed iui:opacity-50": disabled,

					"iui:cursor-pointer": !disabled,
				},
				className
			)}
		>
			{(icon || selected?.icon) && (
				<div
					className={classnames({
						"iui:text-front-hint iui:fill-front-hint":
							status == "default" &&
							(type == "default" || type == "borderless" || type == "text"),
					})}
				>
					<Icon icon={selected?.icon ?? icon} size={size} />
				</div>
			)}

			<div className="iui:flex iui:flex-1 iui:flex-row iui:items-center iui:justify-start iui:overflow-hidden iui:text-ellipsis iui:whitespace-nowrap">
				{content}
			</div>

			<div
				className={classnames("iui:transition-all", {
					"iui:rotate-180": open,
					"iui:text-front-hint iui:fill-front-hint":
						status == "default" &&
						(type == "default" || type == "borderless" || type == "text"),
				})}
			>
				<Icon
					size={size}
					icon={
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 9.17019C16.8126 8.98394 16.5592 8.87939 16.295 8.87939C16.0308 8.87939 15.7774 8.98394 15.59 9.17019L12 12.7102L8.46001 9.17019C8.27265 8.98394 8.0192 8.87939 7.75501 8.87939C7.49082 8.87939 7.23737 8.98394 7.05001 9.17019C6.95628 9.26315 6.88189 9.37375 6.83112 9.49561C6.78035 9.61747 6.75421 9.74818 6.75421 9.88019C6.75421 10.0122 6.78035 10.1429 6.83112 10.2648C6.88189 10.3866 6.95628 10.4972 7.05001 10.5902L11.29 14.8302C11.383 14.9239 11.4936 14.9983 11.6154 15.0491C11.7373 15.0998 11.868 15.126 12 15.126C12.132 15.126 12.2627 15.0998 12.3846 15.0491C12.5064 14.9983 12.617 14.9239 12.71 14.8302L17 10.5902C17.0937 10.4972 17.1681 10.3866 17.2189 10.2648C17.2697 10.1429 17.2958 10.0122 17.2958 9.88019C17.2958 9.74818 17.2697 9.61747 17.2189 9.49561C17.1681 9.37375 17.0937 9.26315 17 9.17019Z" />
						</svg>
					}
				/>
			</div>
		</div>
	);
}

type SelectLabel =
	| "string"
	| React.JSX.Element
	| React.ReactElement
	| React.ReactNode;

interface SelectOptionData<T> {
	value: T;
	icon?: IconProp;
	label?: SelectLabel;
}

interface SelectOptionProps<T> extends SelectOptionData<T> {
	children?: SelectLabel;
	disabled?: boolean;
}

const SelectOption = <T = unknown,>(props: SelectOptionProps<T>) => {
	const {
		value: selectValue,
		onChange,
		size = "default",
		compareKey,
	} = useSelectContext();

	let { value, icon, label, children, disabled } = props;

	const selected = useMemo(() => {
		if (compareKey && value && selectValue) {
			return (value as any)[compareKey] == (selectValue as any)[compareKey];
		}

		return value == selectValue;
	}, [value, selectValue]);

	if (!children) {
		label = children;
	}

	const handleClick = () => {
		if (disabled) {
			return;
		}

		onChange(value);
	};

	return (
		<div
			className={classnames(
				"iui:flex iui:flex-row iui:items-center iui:hover:bg-primary-plain",
				{
					"iui:text-primary iui:fill-primary iui:font-medium": selected,

					"iui:px-3 iui:gap-3": size == "large",
					"iui:px-2.5 iui:gap-2.5": size == "medium",
					"iui:px-2 iui:gap-2": size == "default",
					"iui:px-1.5 iui:gap-1.5": size == "small" || size == "mini",

					// Size
					"iui:control-height-large": size == "large",
					"iui:control-height-medium": size == "medium",
					"iui:control-height-default": size == "default",
					"iui:control-height-small": size == "small",
					"iui:control-height-mini": size == "mini",

					// Disabled
					"iui:cursor-not-allowed iui:opacity-50": disabled,

					"iui:cursor-pointer": !disabled,
				}
			)}
			onClick={handleClick}
		>
			<Icon icon={icon} size={size} />

			{children}
		</div>
	);
};

export { Select, SelectOption };
