import { Theme } from "../../core/enums";

export interface Props {
    mode: Theme;
    handleThemeChange: () => void;
    hasImage:string;
    handleImageChange: () => void;
  }