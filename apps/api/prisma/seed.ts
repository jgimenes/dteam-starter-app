import { PrismaClient } from '../src/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const name = 'Master Sysadmin';
  const email = 'jgimenes@gmail.com';

  // Verifica se já existe uma conta sysadmin
  const existing = await prisma.account.findFirst({
    where: {
      role: 'sysadmin',
      tenantId: null,
    },
  });

  if (existing) {
    console.log(`Sysadmin já existe: ${existing.email}`);
    return;
  }

  // Cria a conta sysadmin (sem tenant)
  await prisma.account.create({
    data: {
      name,
      email,
      role: 'sysadmin',
      tenantId: null,
    },
  });

  console.log(`Sysadmin criado com e-mail: ${email}`);
}

main()
  .catch((e) => {
    console.error('Erro ao criar sysadmin:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
