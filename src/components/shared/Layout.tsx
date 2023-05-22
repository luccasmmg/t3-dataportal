import Footer from "./Footer";
import { NavBar } from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
