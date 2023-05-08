import { useEffect, useState } from "react";
import { Theme } from "../core/enums";

const useTheme = () => {
    const [mode, setMode] = useState<Theme>(Theme.LIGHT);
    const [hasImage, setHasImage] = useState<string>("true");

    const handleThemeChange = () => {
        setMode(mode === Theme.DARK ? Theme.LIGHT : Theme.DARK)
        localStorage.setItem("theme", mode);
    };

    const handleImageChange = () => {
        setHasImage(hasImage=="true" ? "false" : "true");
      localStorage.setItem("hasImage", hasImage);


    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const img = localStorage.getItem('hasImage');

        setMode(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
        setHasImage(img=="true" ? "false" : "true");

    }, []);

    return {
        mode,
        handleThemeChange,
        handleImageChange,
        hasImage
    }

}
export default useTheme