import { PrismaClient } from '@prisma/client'
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Badge } from '@/shared/ui/badge'
import { format } from 'date-fns'
import { requireRole } from '@/features/auth/presentation/guards/auth.guards'
import 'server-only'

const prisma = new PrismaClient()

const roleLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  ADMIN: { label: 'Administrador', variant: 'default' },
  ALMOXARIFE: { label: 'Almoxarife', variant: 'secondary' },
  REQUISITOR: { label: 'Requisitor', variant: 'outline' },
}

async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })
}

export default async function UsersPage() {
  await requireRole(['ADMIN']);
  const users = await getUsers()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-slate-500">Gerencie os usuários do sistema</p>
        </div>
        <Link href="/dashboard/users/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const roleConfig = roleLabels[user.role] || { label: user.role, variant: 'outline' }
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={roleConfig.variant}>
                          {roleConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(user.createdAt, 'dd/MM/yyyy HH:mm')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/users/${user.id}/edit`} title="Editar">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          {users.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Users className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p>Nenhum usuário cadastrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}