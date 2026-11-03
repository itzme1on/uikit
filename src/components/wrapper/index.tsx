import React from "react";
import { Theme, ThemeStyle } from "../../theme/theme";
import { LightTheme } from "../../theme/themes";
import { OverlayProvider } from "../overlay/context";
import { PopupProvider } from "../popup/context";

interface Props {
	children: React.ReactNode | React.ReactElement | React.JSX.Element;
	theme?: Theme;
}

const UIKit: React.FC<Props> = ({ children, theme = LightTheme }) => {
	return (
		<>
			<OverlayProvider>
				<PopupProvider>{children}</PopupProvider>
			</OverlayProvider>

			<ThemeStyle value={theme} />
		</>
	);
};

export default UIKit;
