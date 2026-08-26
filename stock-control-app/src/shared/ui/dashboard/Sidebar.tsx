'use client'

import { logoutAction } from "@/features/auth/presentation/actions/auth.actions";
import { CalendarDays, CircleAlert, Home, LogOut, Package, Settings, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  
  const getLinkClasses = (path: string) => {
      const isActivate = path === '/dashboard'
      ? pathname === path 
      : pathname.startsWith(path);

      const baseCLasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer";
      const activeClasses = "bg-slate-800 text-white font-medium";
      const inactiveClasses = "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200";

      return `${baseCLasses} ${isActivate ? activeClasses : inactiveClasses}`;
    };
    
    return (
      <div className="h-full bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-wider">ESTOCAÍ</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/dashboard" 
            className= {getLinkClasses("/dashboard")}
            title="Visão Geral">
            <Home size={20} />
            <span>Visão Geral</span>
          </Link>

          <Link 
            href="/dashboard/inventory" 
            className= {getLinkClasses("/dashboard/inventory")}
            title="Inventário">
            <Package size={20} />
            <span>Inventário</span>
          </Link>

          <Link 
            href="/dashboard/users" 
            className= {getLinkClasses("/dashboard/users")}
            title="Usuários">
            <Users size={20} />
            <span>Usuários</span>
          </Link>

          <Link 
            href="/dashboard/monthly-requests" 
            className={getLinkClasses("/dashboard/monthly-requests")}
            title="Solicitação Mensal">
            <CalendarDays size={20} />
            <span  className= "truncate">Solicitação Mensal</span>
          </Link>

          <Link 
            href="/dashboard/request" 
            className={getLinkClasses("/dashboard/request")}
            title="Requisição">
            <UserPlus size={20} />
            <span>Requisição</span>
          </Link>

          <Link 
            href="/dashboard/settings" 
            className={getLinkClasses("/dashboard/settings")}
            title="Configurações">
            <Settings size={20} />
            <span>Configurações</span>
          </Link>

          <Link 
            href="/dashboard/alerts" 
            className={getLinkClasses("/dashboard/alerts")}
            title="Alertas">
            <CircleAlert size={20} />
            <span>Alertas</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button type="submit"
            className="flex items-center gap-3 py-3 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer" title="Sair">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </form>
          <p className="text-xs text-slate-500">Logado como Almoxarife</p>
        </div>
      </div>
    );
  }