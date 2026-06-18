import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.onload = () => {
  window.scrollTo(0, 0);
};

createRoot(document.getElementById("root")!).render(<App />);
