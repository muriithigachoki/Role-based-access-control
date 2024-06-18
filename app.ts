import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const event = await prisma.event.create({
  //   data: {
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //     title: "Summer Music Festival",
  //     price: 50,
  //     date: "2021-08-20T00:00:00Z", // ISO-8601 format
  //     location: "Kenya national Park",
  //     company: "Kenya wildlife.",
  //     user: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // });

  const events = await prisma.event.findMany();
  console.log(events);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
