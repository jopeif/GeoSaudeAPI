import {prisma} from "../infra/db/prisma/Prisma"

async function clearDatabase() {
    console.log("Limpando banco de dados...")
  // Ordem importa se houver FK
    await prisma.$transaction([
        prisma.refreshToken.deleteMany(),
        prisma.user.deleteMany(),
    ]);
}

clearDatabase()
    .then(() => {
        console.log("Banco limpo com sucesso");
    })
    .catch((e) => {
        console.error("Erro ao limpar banco:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });