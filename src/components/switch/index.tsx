import classNames from "classnames";
import { ControlsProps } from "../../common/controls.type";

interface Props extends Pick<ControlsProps, "disabled"> {
	value: boolean;
	onChange: (status: boolean) => void;
	label?: string;
}

const Switch = ({ value, onChange, disabled, label }: Props) => {
	// aria-disabled вместо disabled: иначе браузер снимает фокус, пока идет сохранение
	const handleClick = () => {
		if (disabled) return;

		onChange(!value);
	};

	return (
		<button
			type="button"
			role="switch"
			aria-checked={value}
			aria-label={label}
			aria-disabled={disabled}
			onClick={handleClick}
			className={classNames(
				"iui:p-0 iui:border-0 iui:bg-transparent iui:w-10 iui:h-10 iui:aspect-square iui:flex iui:flex-col iui:items-center iui:justify-center iui:shrink iui:cursor-pointer iui:rounded-full iui:transition-opacity iui:duration-300 iui:focus-visible:outline-2 iui:focus-visible:outline-offset-2 iui:focus-visible:outline-primary",
				{
					"iui:opacity-50 iui:cursor-not-allowed": disabled,
				}
			)}
		>
			<span
				aria-hidden
				className={classNames(
					"iui:relative iui:block iui:w-10 iui:h-6 iui:rounded-full iui:transition-all iui:duration-300",
					{
						"iui:bg-primary": value,
						"iui:bg-stroke": !value,
					}
				)}
			>
				<span
					className={classNames(
						"iui:absolute iui:block iui:aspect-square iui:w-5 iui:h-5 iui:mt-0.5 iui:rounded-full iui:transition-all iui:duration-300",
						{
							"iui:ml-4.5 iui:bg-primary-front": value,
							"iui:ml-0.5 iui:bg-background": !value,
						}
					)}
				/>
			</span>
		</button>
	);
};

export default Switch;
