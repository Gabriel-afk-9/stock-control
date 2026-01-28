'use client'

import Image from "next/image";
import { useActionState } from "react";
import { loginAction } from "../../../actions/authAction"; 
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/background.png"
          alt="Almoxarifado Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xs p-8 rounded-2xl shadow-2xl border border-white/20 text-white">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider">ESTOCAÍ</h1>
          <p className="text-sm uppercase tracking-[0.2em] opacity-80">Controle de Almoxarifado</p>
        </div>

        <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-red-200 text-sm text-center animate-pulse z-10">
              {state.error}
              </div>
            )}
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white">Email de Acesso</label>
                <input 
                    name="email"
                    type="email" 
                    placeholder="admin@estocai.com"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white">Senha</label>
                <input 
                    name="password"
                    type="password" 
                    placeholder="••••••"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                    required
                />
            </div>
            <button 
                disabled={isPending}
                className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        ENTRANDO...
                    </>
                ) : (
                    "ACESSAR SISTEMA"
                )}
            </button>
            
            <div className="text-center text-xs text-gray-400 mt-4">
               <p>Não tem acesso? Fale com o almoxarife chefe.</p>
            </div>
        </form>

      </div>
    </div>
  );
}