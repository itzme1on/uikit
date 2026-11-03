import classnames from "classnames";
import React, { forwardRef, useEffect, useRef } from "react";
import { ControlsProps } from "../../common/controls.type";
import { useCombinedRefs } from "../../hooks/combinedrefs";

type P = Omit<React.HTMLProps<HTMLTextAreaElement>, "size"> & ControlsProps;

interface Props extends P {
	value?: string;
	autosize?: boolean | { minRows?: number; maxRows?: number };
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
	(
		{
			value,
			onChange,
			disabled,
			success,
			warning,
			error,
			size = "default",
			autosize = { minRows: 2, maxRows: 5 },
			...restProps
		},
		ref
	) => {
		const textareaElement = useRef<HTMLTextAreaElement>(null);
		const combinedRef = useCombinedRefs<HTMLTextAreaElement>(
			textareaElement,
			ref
		);

		useEffect(() => {
			if (textareaElement.current) {
				updateSize();
			}
		}, []);

		useEffect(() => {
			updateSize();
		}, [value, autosize, textareaElement]);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			if (onChange) {
				onChange(e);
			}

			updateSize();
		};

		const updateSize = () => {
			if (!autosize) {
				return;
			}

			if (!textareaElement.current) {
				return;
			}

			setupHeightLimits();

			const styles = getComputedStyle(textareaElement.current);
			const borderTopWidth = parseInt(styles.borderTopWidth);
			const borderBottomWidth = parseInt(styles.borderBottomWidth);
			const borderVeritalWidth = borderTopWidth + borderBottomWidth;

			textareaElement.current.style.height = "0";
			textareaElement.current.style.height = `${
				textareaElement.current.scrollHeight + borderVeritalWidth
			}px`;
		};

		const setupHeightLimits = () => {
			if (!autosize || typeof autosize == "boolean") {
				return;
			}

			if (!textareaElement.current) {
				return;
			}

			const styles = getComputedStyle(textareaElement.current);
			const lineHeight = parseInt(styles.lineHeight);
			const borderTopWidth = parseInt(styles.borderTopWidth);
			const borderBottomWidth = parseInt(styles.borderBottomWidth);
			const borderVeritalWidth = borderTopWidth + borderBottomWidth;
			const paddingTop = parseInt(styles.paddingTop);
			const paddingBottom = parseInt(styles.paddingBottom);
			const verticalPadding = paddingTop + paddingBottom;

			let { minRows, maxRows } = autosize;

			if (minRows) {
				textareaElement.current.style.minHeight = `${
					lineHeight * minRows + verticalPadding + borderVeritalWidth
				}px`;
			}

			if (maxRows) {
				textareaElement.current.style.maxHeight = `${
					lineHeight * maxRows + verticalPadding + borderVeritalWidth
				}px`;
			}
		};

		return (
			<textarea
				ref={combinedRef}
				value={value}
				onChange={handleChange}
				{...restProps}
				className={classnames(
					restProps.className,
					"iui:rounded-control iui:editable-control-border iui:editable-control-background iui:resize-none iui:placeholder:text-front-hint",
					{
						"iui:editable-control-border-success": success && !error && !warning,
						"iui:editable-control-border-error": error && !warning,
						"iui:editable-control-border-warning": warning,
						"iui:opacity-50": disabled,

						"iui:px-3 iui:py-3": size == "large",
						"iui:px-3 iui:py-2.5": size == "medium",
						"iui:px-3 iui:py-2": size == "default",
						"iui:px-2.5 iui:py-1.5": size == "small",
						"iui:px-2 iui:py-1": size == "mini",
					}
				)}
				disabled={disabled}
			></textarea>
		);
	}
);

export default Textarea;
