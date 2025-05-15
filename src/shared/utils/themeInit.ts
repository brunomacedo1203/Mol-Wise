export function themeInitScript() {
    return `
      (function () {
        try {
          const theme = localStorage.getItem("theme");
          const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if (theme === "dark" || (!theme && systemPrefersDark)) {
            document.documentElement.classList.add("dark");
          }
        } catch(e) {}
      })();
    `;
  }
  