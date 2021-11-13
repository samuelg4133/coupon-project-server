import { hash } from "bcryptjs";
import { prisma } from "./client";

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "leosgv.sv@gmail.com",
        login: "samuel",
        password: await hash("123456", 8),
      },
      {
        email: "financeiro@aciapicdlpirapora.com.br",
        login: "milena",
        password: "",
      },
      {
        email: "gerencia@aciapicdlpirapora.com.br",
        login: "thayse",
        password: "",
      },
      {
        email: "comercialcdl@hotmail.com",
        login: "gleice",
        password: "",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
