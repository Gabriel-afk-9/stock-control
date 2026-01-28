import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('Chimbinha17', 10)

  await prisma.user.upsert({
    where: { email: 'Chimbinha1717@gmail.com' },
    update: {},
    create: {
      email: 'Chimbinha1717@gmail.com',
      name: 'Chimbinha',
      password,
      role: 'ALMOXARIFE',
    },
  })

  // await prisma.user.upsert({
  //   where: { email: 'func@estocai.com' },
  //   update: {},
  //   create: {
  //     email: 'func@estocai.com',
  //     name: 'Biel Funcionário',
  //     password,
  //     role: 'REQUISITOR',
  //   },
  // })
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

  // npx prisma db seed