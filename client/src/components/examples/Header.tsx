import { ThemeProvider } from "../ThemeProvider";
import { Header } from "../Header";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header />
      <div className="h-screen" />
    </ThemeProvider>
  );
}
