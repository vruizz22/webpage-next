import { PrismaClient } from '@prisma/client';
import { moduleBossEmails } from '@/config/config';

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  prisma.$use(async (params, next) => {
    if (params.model === 'User' && params.action === 'create') {
      const email = params.args.data.email;
      if (moduleBossEmails.includes(email)) {
        params.args.data.is_module_boss = true;
      }
    }
    return next(params);
  });

  return prisma;
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma;
/*
async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doeaskdak",
            email: "boss1@example.com",
            password: "securepassword",
        },
    });
    console.log("Usuario creado:", user);
}

main().catch((e) => {
    console.error(e);
    prisma.$disconnect();
});
*/
