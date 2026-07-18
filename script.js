const toggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

function setTheme(theme) {
  const isDark = theme === "dark";

  root.dataset.theme = theme;
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.textContent = isDark ? "Light mode" : "Dark mode";
}

setTheme(initialTheme);

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});
