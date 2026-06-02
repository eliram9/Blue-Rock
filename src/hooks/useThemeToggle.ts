import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Get the actual current theme (resolve 'system' to actual theme)
    const currentTheme = theme === "system" ? systemTheme : theme;

    return {
        theme: currentTheme,
        toggleTheme,
        mounted,
        isDark: currentTheme === "dark",
    };
}
