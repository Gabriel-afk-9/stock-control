import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const almoxarifePassword = process.env.ALMOXARIFE_PASSWORD || 'almoxarife123'
  const requisitorPassword = process.env.REQUISITOR_PASSWORD || 'requisitor123'

  const hashedAdminPassword = await hash(adminPassword, 12)
  const hashedAlmoxarifePassword = await hash(almoxarifePassword, 12)
  const hashedRequisitorPassword = await hash(requisitorPassword, 12)

  await prisma.user.upsert({
    where: { email: 'admin@estocai.com' },
    update: {},
    create: {
      email: 'admin@estocai.com',
      name: 'Administrador',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'almoxarife@estocai.com' },
    update: {},
    create: {
      email: 'almoxarife@estocai.com',
      name: 'Almoxarife',
      password: hashedAlmoxarifePassword,
      role: 'ALMOXARIFE',
    },
  })

  await prisma.user.upsert({
    where: { email: 'requisitor@estocai.com' },
    update: {},
    create: {
      email: 'requisitor@estocai.com',
      name: 'Requisitor',
      password: hashedRequisitorPassword,
      role: 'REQUISITOR',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })