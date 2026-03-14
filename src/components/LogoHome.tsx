import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-el-patron.jpeg";

export function LogoHome({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className={`transition-transform hover:scale-105 active:scale-95 ${className}`}
      aria-label="Voltar para Home"
    >
      <img src={logo} alt="Barbearia El Patron" className="h-12 w-auto object-contain" />
    </button>
  );
}
