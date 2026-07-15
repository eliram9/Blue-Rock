import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Resolve 'system' to the actual active theme
    const currentTheme = theme === "system" ? systemTheme : theme;

    // Toggle off the RESOLVED theme so a first click from "system" always
    // flips visibly (using raw `theme` could no-op when OS matches the target).
    const toggleTheme = () => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
    };

    return {
        theme: currentTheme,
        toggleTheme,
        mounted,
        isDark: currentTheme === "dark",
    };
}
