import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SunIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" stroke="currentColor" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
    />
  </svg>
);

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex h-8 w-14 items-center justify-center rounded-full border border-orange-600 bg-orange-500 transition-colors focus:outline-none"
      >
        <span
          className={`block h-6 w-6 rounded-full border border-orange-400 bg-white shadow-md transition-all duration-300 ${
            isDark ? "translate-x-3" : "-translate-x-3"
          }`}
        />
      </button>
      <span className="flex items-center text-orange-500">
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
