import Footer from "./Footer";
import { NavBar } from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <NavBar />
        {children}
        <Footer />
    </div>
  );
}
