import { validationResult, matchedData } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const filterEventsController = async (req, res) => {
  const events = await prisma.event.findMany();

  const { filter, value } = matchedData(req);
  if (!filter && !value) {
    return res.json(events);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (filter && value) {
    const filterCondition = {};
    filterCondition[filter] = {
      contains: value,
    };

    const user = await prisma.event.findMany({
      where: filterCondition,
    });

    return res.json(user);
  }
};

export const getEventByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "event not found" });
  }

  const { eventId } = req;

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  res.json(event);
};

export const createEventController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { imageUrl, title, price, date, location, company, userId } =
    matchedData(req);
  const event = await prisma.event.create({
    data: {
      imageUrl: imageUrl,
      title: title,
      price: price,
      date: date,
      location: location,
      company: company,
      user: {
        connect: { id: userId },
      },
    },
  });
  res.json(event);
};

export const updateEventController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { eventId } = req;

  const data = matchedData(req);

  const new_event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      ...data,
    },
  });

  res.json(new_event);
};

export const deleteEventController = async (req, res) => {
  const { eventId } = req;
  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  res.status(200).json({ message: "Event deleted successfully" });
};
