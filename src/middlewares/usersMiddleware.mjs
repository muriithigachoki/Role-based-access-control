import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchuserByIdMiddleware = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const user = await prisma.user.findUnique({
    where: { id: parsedId },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.userId = parsedId;
  next();
};

export { fetchuserByIdMiddleware };
