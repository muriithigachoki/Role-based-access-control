import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchEventByIdMiddleware = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const event = await prisma.event.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!event) {
    return res.status(404).json({ error: "event not found" });
  }

  req.eventId = parsedId;
  next();
};

export { fetchEventByIdMiddleware };
