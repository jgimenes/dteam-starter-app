import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'master@devteam.com.br';

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

  // Cria um usuário opcional (caso deseje associar)
  const user = await prisma.user.create({
    data: {
      name: 'Administrador do Sistema',
    },
  });

  // Cria a conta sysadmin (sem tenant)
  await prisma.account.create({
    data: {
      email,
      userId: user.id,
      role: 'sysadmin',
      tenantId: null,
      verifiedAt: new Date(),
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
