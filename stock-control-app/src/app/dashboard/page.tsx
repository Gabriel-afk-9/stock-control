'use client'

import { Package, Users, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

export default function DashboardOverview() {
  const stats = [
    { title: 'Produtos em Estoque', value: '1.234', icon: Package, href: '/dashboard/inventory', color: 'text-blue-500' },
    { title: 'Usuários Ativos', value: '12', icon: Users, href: '/dashboard/users', color: 'text-green-500' },
    { title: 'Alertas de Estoque Baixo', value: '5', icon: AlertCircle, href: '/dashboard/alerts', color: 'text-orange-500' },
    { title: 'Solicitações Pendentes', value: '8', icon: TrendingUp, href: '/dashboard/request', color: 'text-purple-500' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visão Geral</h1>
        <Link href="/dashboard/inventory">
          <Button>Ver Inventário</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="no-underline">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/inventory">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <Package className="mr-2 h-4 w-4" />
              Gerenciar Inventário
            </Button>
          </Link>
          <Link href="/dashboard/users">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Usuários
            </Button>
          </Link>
          <Link href="/dashboard/alerts">
            <Button variant="outline" className="w-full justify-start h-auto py-4">
              <AlertCircle className="mr-2 h-4 w-4" />
              Ver Alertas
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}