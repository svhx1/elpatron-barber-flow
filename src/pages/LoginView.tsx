import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo-el-patron.jpeg";
import { Input } from "@/components/ui/input";
import { ScreenNavigator } from "@/components/ScreenNavigator";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      <ScreenNavigator />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="El Patron" className="h-24 mx-auto mb-4 object-contain" />
          <div className="w-16 h-0.5 gold-gradient mx-auto rounded-full" />
        </div>

        <div className="bg-charcoal-light/80 backdrop-blur-sm rounded-2xl border border-gold/20 p-8">
          <h2 className="font-display text-xl font-bold text-gold text-center mb-6">
            {isSignUp ? "Criar Conta" : "Entrar"}
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-charcoal border-gold/20 text-gold placeholder:text-gold/30 focus-visible:ring-gold/40"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="pl-10 pr-10 bg-charcoal border-gold/20 text-gold placeholder:text-gold/30 focus-visible:ring-gold/40"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/40 hover:text-gold/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {!isSignUp && (
              <button className="text-xs text-gold/50 hover:text-gold/70 font-body transition-colors">
                Esqueceu a senha?
              </button>
            )}

            <button className="w-full py-3 rounded-xl gold-gradient text-charcoal font-body text-sm font-bold hover:opacity-90 transition-opacity">
              {isSignUp ? "Criar Conta" : "Entrar"}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/15" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-charcoal-light/80 px-3 text-gold/40 font-body">ou</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl border border-gold/20 bg-charcoal hover:bg-charcoal-light/60 transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-gold font-body text-sm font-medium">Entrar com Google</span>
          </button>

          <p className="text-center text-xs text-gold/40 font-body mt-6">
            {isSignUp ? "Já tem conta?" : "Não tem conta?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gold/70 hover:text-gold underline transition-colors"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
