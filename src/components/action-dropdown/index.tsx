import classNames from "classnames";
import React, { ReactElement, createContext, useContext } from "react";
import { ControlStatusProps, Placement } from "../../common/controls.type";
import Dropdown from "../dropdown";
import Icon, { IconProp } from "../icon";

interface ActionDropdownItemProps extends ControlStatusProps {
	icon?: IconProp;
	suffixIcon?: IconProp;

	prefix?: string | ReactElement | ReactElement[];
	suffix?: string | ReactElement | ReactElement[];

	children: string | ReactElement | ReactElement[];
	onClick?: React.MouseEventHandler<HTMLDivElement>;

	primary?: boolean;
	danger?: boolean;

	disabled?: boolean;
	closeAfterClick?: boolean;
}

export const ActionDropdownItem = ({
	children,
	icon,
	suffixIcon,
	prefix,
	suffix,
	success,
	error,
	warning,
	danger,
	primary,
	disabled,
	onClick,
	closeAfterClick = true,
}: ActionDropdownItemProps) => {
	const isDefault = !(success || error || warning || danger || primary);

	const { onClose } = useActionDropdownContext();

	const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (onClick) {
			onClick(e);
		}

		if (closeAfterClick) {
			onClose();
		}
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				"iui:flex iui:flex-row iui:items-center iui:gap-2 iui:px-3 iui:control-height-large iui:whitespace-nowrap",
				{
					"iui:cursor-pointer": !disabled,
					"iui:opacity-50 iui:pointer-events-none": disabled,

					"iui:hover:bg-background-hover": isDefault,
					"iui:text-primary iui:hover:bg-primary-hover": primary,
					"iui:text-error iui:hover:bg-error-hover": error || danger,
					"iui:text-warning iui:hover:bg-warning-hover": warning,
					"iui:text-success iui:hover:bg-success-hover": success,
				}
			)}
		>
			<div className="iui:flex iui:flex-row iui:items-center iui:gap-2 iui:flex-1">
				{icon && <Icon icon={icon} />}
				{prefix && <span>{prefix}</span>}
				<span>{children}</span>
			</div>
			{suffix && <span>{suffix}</span>}
			{suffixIcon && <Icon icon={suffixIcon} />}
		</div>
	);
};

interface ActionDropdownContextProps {
	onClose: () => void;
}

const Context = createContext<ActionDropdownContextProps>({
	onClose: () => {},
});

const useActionDropdownContext = () => useContext(Context);

interface ActionDropdownProps {
	button: string | ReactElement | ReactElement[];
	children: string | ReactElement | ReactElement[];
	show: boolean;
	placement?: Placement;
	onClose: () => void;
}

export const ActionDropdown = ({
	children,
	button,
	show,
	placement,
	onClose,
}: ActionDropdownProps) => {
	const contextValue: ActionDropdownContextProps = {
		onClose,
	};

	return (
		<Context.Provider value={contextValue}>
			<Dropdown
				show={show}
				onClickOutside={onClose}
				button={button}
				placement={placement}
			>
				<div className="iui:flex iui:flex-col">{children}</div>
			</Dropdown>
		</Context.Provider>
	);
};
