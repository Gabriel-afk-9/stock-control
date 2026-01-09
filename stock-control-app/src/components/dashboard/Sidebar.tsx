import Link from "next/link";
import { Package, Users, Home } from "lucide-react";

export function Sidebar() {
  return (
    <div className="h-full bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wider">ESTOCAÍ</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white"
        >
          <Home size={20} />
          <span>Visão Geral</span>
        </Link>

        <Link 
          href="/dashboard/inventory" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white"
        >
          <Package size={20} />
          <span>Inventário</span>
        </Link>

        <Link 
          href="/dashboard/users" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white"
        >
          <Users size={20} />
          <span>Usuários</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">Logado como Almoxarife</p>
      </div>
    </div>
  );
}