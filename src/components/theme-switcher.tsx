import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded border bg-orange-500 p-2 text-sm text-white"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeSwitcher;
