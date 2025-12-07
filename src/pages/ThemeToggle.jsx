import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const root = document.documentElement;
        root.classList.add("theme-transition");

        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-2 rounded-md bg-gray-300"
        >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;
