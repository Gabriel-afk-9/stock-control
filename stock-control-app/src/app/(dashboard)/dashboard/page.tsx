import Link from "next/link";
import { Package, Users } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Painel Geral</h1>
        <p className="text-gray-500">Bem-vindo ao Estocaí. Selecione um módulo para começar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CORREÇÃO: Link aponta para /dashboard/inventory */}
        <Link href="/dashboard/inventory" className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Inventário</h3>
          </div>
          <p className="text-sm text-gray-500">Gerencie entradas, saídas e consulte o estoque atual.</p>
        </Link>

        {/* CORREÇÃO: Link aponta para /dashboard/users */}
        <Link href="/dashboard/users" className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-300 transition cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Usuários</h3>
          </div>
          <p className="text-sm text-gray-500">Cadastre novos funcionários e gerencie permissões.</p>
        </Link>
      </div>
    </div>
  );
}