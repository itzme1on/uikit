import React from "react";
import { hex2rgb, isHex, mixColors } from "../utils/colors";
import { generateThemeColorPalette, getBrightness } from "./theme-utils";

const DEFAULT_PRIMARY = "#9160f8";
const DEFAULT_ERROR_PRIMARY = "#f16969";
const DEFAULT_WARNING_PRIMARY = "#f89760";
const DEFAULT_SUCCESS_PRIMARY = "#67c23a";

export class Theme {
	controlRounded?: string = "0.75rem";
	modalRounded?: string = "1.5rem";
	stroke?: string = "#e5e7eb";

	front?: string = "#404040";
	frontHint?: string = "#aaaaaa";
	frontSecondary?: string = "#808080";

	background?: string = "#ffffff";
	backgroundBody?: string = "#ffffff";
	backgroundBackdrop?: string = "#000000";
	backgroundHover?: string = "#fafafa";
	backgroundActive?: string = "#f9f9f9";

	primary?: string = DEFAULT_PRIMARY;
	primaryFront?: string = "#ffffff";
	primaryHover?: string = "#A780F9";
	primaryActive?: string = "#8b55fd";
	primaryLight?: string = "#c3a7ff";
	primaryAccentHover?: string = "#A780F9";
	primaryAccentActive?: string = "#8B55FD";
	primaryPlain?: string = "#f4effe";
	primaryPlainHover?: string = "#EBE1FF";
	primaryPlainActive?: string = "#f2ebff";

	error?: string = DEFAULT_ERROR_PRIMARY;
	errorFront?: string = "#ffffff";
	errorHover?: string = "#fff5f5";
	errorActive?: string = "#ffeeee";
	errorLight?: string = "#ffecef";
	errorAccentHover?: string = "#fb7c7c";
	errorAccentActive?: string = "#f25d5d";
	errorPlain?: string = "#ffecef";
	errorPlainHover?: string = "#ffe8eb";
	errorPlainActive?: string = "#ffe4e9";

	warning?: string = DEFAULT_WARNING_PRIMARY;
	warningFront?: string = "#ffffff";
	warningHover?: string = "#fff6f1";
	warningActive?: string = "#fff0e8";
	warningLight?: string = "#FFF3ED";
	warningAccentHover?: string = "#ffa775";
	warningAccentActive?: string = "#f2884c";
	warningPlain?: string = "#fff3ed";
	warningPlainHover?: string = "#fff0e8";
	warningPlainActive?: string = "#ffe8dc";

	success?: string = DEFAULT_SUCCESS_PRIMARY;
	successFront?: string = "#ffffff";
	successHover?: string = "#f7fff5";
	successActive?: string = "#efffeb";
	successLight?: string = "#E9FFE3";
	successAccentHover?: string = "#85ce61";
	successAccentActive?: string = "#5daf34";
	successPlain?: string = "#f0f9eb";
	successPlainHover?: string = "#f2ffee";
	successPlainActive?: string = "#e4ffdd";

	constructor(props: Readonly<Theme>) {
		let {
			front,
			background,
			backgroundBody,
			stroke,

			primary,

			error,

			warning,

			success,
		} = props;

		const backgroundBrightness = getBrightness(background ?? "#ffffff");
		background = background ?? "#ffffff";
		backgroundBody = backgroundBody ?? background;
		front = front ?? (backgroundBrightness > 260 ? "#000000" : "#ffffff");
		stroke = stroke ?? "#e5e7eb";

		const backgroundHover = mixColors(front, background, 3);
		const backgroundActive = mixColors(front, background, 5);

		stroke = mixColors(front, background, 10);

		const {
			front: primaryFront,
			hover: primaryHover,
			active: primaryActive,
			light: primaryLight,
			plain: primaryPlain,
			plainHover: primaryPlainHover,
			plainActive: primaryPlainActive,
			primaryHover: primaryAccentHover,
			primaryActive: primaryAccentActive,
		} = generateThemeColorPalette({
			color: primary ?? DEFAULT_PRIMARY,
			background,
		});

		const {
			front: errorFront,
			hover: errorHover,
			active: errorActive,
			light: errorLight,
			plain: errorPlain,
			plainHover: errorPlainHover,
			plainActive: errorPlainActive,
			primaryHover: errorAccentHover,
			primaryActive: errorAccentActive,
		} = generateThemeColorPalette({
			color: error ?? DEFAULT_ERROR_PRIMARY,
			background,
		});

		const {
			front: warningFront,
			hover: warningHover,
			active: warningActive,
			light: warningLight,
			plain: warningPlain,
			plainHover: warningPlainHover,
			plainActive: warningPlainActive,
			primaryHover: warningAccentHover,
			primaryActive: warningAccentActive,
		} = generateThemeColorPalette({
			color: warning ?? DEFAULT_WARNING_PRIMARY,
			background,
		});

		const {
			front: successFront,
			hover: successHover,
			active: successActive,
			light: successLight,
			plain: successPlain,
			plainHover: successPlainHover,
			plainActive: successPlainActive,
			primaryHover: successAccentHover,
			primaryActive: successAccentActive,
		} = generateThemeColorPalette({
			color: success ?? DEFAULT_SUCCESS_PRIMARY,
			background: background,
		});

		Object.assign(this, {
			...props,

			front,
			backgroundBody: props.backgroundBody ?? backgroundBody,
			backgroundHover: props.backgroundHover ?? backgroundHover,
			backgroundActive: props.backgroundActive ?? backgroundActive,

			stroke: props.stroke ?? stroke,

			primaryFront: props.primaryFront ?? primaryFront,
			primaryHover: props.primaryHover ?? primaryHover,
			primaryActive: props.primaryActive ?? primaryActive,
			primaryLight: props.primaryLight ?? primaryLight,
			primaryAccentHover: props.primaryAccentHover ?? primaryAccentHover,
			primaryAccentActive: props.primaryAccentActive ?? primaryAccentActive,
			primaryPlain: props.primaryPlain ?? primaryPlain,
			primaryPlainHover: props.primaryPlainHover ?? primaryPlainHover,
			primaryPlainActive: props.primaryPlainActive ?? primaryPlainActive,

			errorFront: props.errorFront ?? errorFront,
			errorHover: props.errorHover ?? errorHover,
			errorActive: props.errorActive ?? errorActive,
			errorLight: props.errorLight ?? errorLight,
			errorAccentHover: props.errorAccentHover ?? errorAccentHover,
			errorAccentActive: props.errorAccentActive ?? errorAccentActive,
			errorPlain: props.errorPlain ?? errorPlain,
			errorPlainHover: props.errorPlainHover ?? errorPlainHover,
			errorPlainActive: props.errorPlainActive ?? errorPlainActive,

			warningFront: props.warningFront ?? warningFront,
			warningHover: props.warningHover ?? warningHover,
			warningActive: props.warningActive ?? warningActive,
			warningLight: props.warningLight ?? warningLight,
			warningAccentHover: props.warningAccentHover ?? warningAccentHover,
			warningAccentActive: props.warningAccentActive ?? warningAccentActive,
			warningPlain: props.warningPlain ?? warningPlain,
			warningPlainHover: props.warningPlainHover ?? warningPlainHover,
			warningPlainActive: props.warningPlainActive ?? warningPlainActive,

			successFront: props.successFront ?? successFront,
			successHover: props.successHover ?? successHover,
			successActive: props.successActive ?? successActive,
			successLight: props.successLight ?? successLight,
			successAccentHover: props.successAccentHover ?? successAccentHover,
			successAccentActive: props.successAccentActive ?? successAccentActive,
			successPlain: props.successPlain ?? successPlain,
			successPlainHover: props.successPlainHover ?? successPlainHover,
			successPlainActive: props.successPlainActive ?? successPlainActive,
		});
	}
}

export const ThemeStyle = ({ value }: { value: Theme }) => {
	let props: any = {
		...value,
	};

	for (let key of Object.keys(props)) {
		let value = props[key];

		if (isHex(value)) {
			props[key] = hex2rgb(value);
		}
	}

	let theme: Theme = props;

	return (
		<style>
			{`
           

            :root {

                --ui-control-rounded: ${theme.controlRounded};
                --ui-modal-rounded: ${theme.modalRounded};
            
                /*
                ===================
                STROKE
                ===================
                */
                --ui-stroke: ${theme.stroke};
            
                /*
                ===================
                FRONT
                ===================
                */
                --ui-front: ${theme.front};
                --ui-front-hint: ${theme.frontHint};
                --ui-front-secondary: ${theme.frontSecondary};
            
                /*
                ===================
                BACKGROUND
                ===================
                */
                --ui-background: ${theme.background};
                --ui-background-body: ${theme.backgroundBody};
                --ui-background-backdrop: ${theme.backgroundBackdrop};
                --ui-background-hover: ${theme.backgroundHover};
                --ui-background-active: ${theme.backgroundActive};
            
                /*
                ===================
                PRIMARY
                ===================
                */
                --ui-primary: ${theme.primary};
                --ui-primary-front: ${theme.primaryFront};
                --ui-primary-hover: ${theme.primaryHover};
                --ui-primary-active: ${theme.primaryActive};
                --ui-primary-accent-hover: ${theme.primaryAccentHover};
                --ui-primary-accent-active: ${theme.primaryAccentActive};
                --ui-primary-light: ${theme.primaryLight};
            
                --ui-primary-plain: ${theme.primaryPlain};
                --ui-primary-plain-hover: ${theme.primaryPlainHover};
                --ui-primary-plain-active: ${theme.primaryPlainActive};
            
            
                /*
                ===================
                ERROR
                ===================
                */
                --ui-error: ${theme.error};
                --ui-error-front: ${theme.errorFront};
                --ui-error-hover: ${theme.errorHover};
                --ui-error-active: ${theme.errorActive};
                --ui-error-light: ${theme.errorLight};
                --ui-error-accent-hover: ${theme.errorAccentHover};
                --ui-error-accent-active: ${theme.errorAccentActive};
                --ui-error-plain: ${theme.errorPlain};
                --ui-error-plain-hover: ${theme.errorPlainHover};
                --ui-error-plain-active: ${theme.errorPlainActive};
            
            
                /*
                ===================
                WARNING
                ===================
                */
                --ui-warning: ${theme.warning};
                --ui-warning-front: ${theme.warningFront};
                --ui-warning-hover: ${theme.warningHover};
                --ui-warning-active: ${theme.warningActive};
                --ui-warning-light: ${theme.warningLight};
                --ui-warning-accent-hover: ${theme.warningAccentHover};
                --ui-warning-accent-active: ${theme.warningAccentActive};
                --ui-warning-plain: ${theme.warningPlain};
                --ui-warning-plain-hover: ${theme.warningPlainHover};
                --ui-warning-plain-active: ${theme.warningPlainActive};
            
            
                /*
                ===================
                SUCCESS
                ===================
                */
                --ui-success: ${theme.success};
                --ui-success-front: ${theme.successFront};
                --ui-success-hover: ${theme.successHover};
                --ui-success-active: ${theme.successActive};
                --ui-success-light: ${theme.successLight};
                --ui-success-accent-hover: ${theme.successAccentHover};
                --ui-success-accent-active: ${theme.successAccentActive};
                --ui-success-plain: ${theme.successPlain};
                --ui-success-plain-hover: ${theme.successPlainHover};
                --ui-success-plain-active: ${theme.successPlainActive};
            
            }

            body {
                color: rgb(var(--ui-front));
                background-color: rgb(var(--ui-background-body));
            }
        `}
		</style>
	);
};
