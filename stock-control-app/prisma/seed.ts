import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('123456', 10)

  await prisma.user.upsert({
    where: { email: 'admin@estocai.com' },
    update: {},
    create: {
      email: 'admin@estocai.com',
      name: 'Admin Estocai',
      password,
      role: 'ALMOXARIFE',
    },
  })

  await prisma.user.upsert({
    where: { email: 'func@estocai.com' },
    update: {},
    create: {
      email: 'func@estocai.com',
      name: 'Biel Funcionário',
      password,
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