import { PrismaClient } from "@prisma/client";
import { validationResult, matchedData } from "express-validator";

const prisma = new PrismaClient();

const filterUsersController = async (req, res) => {
  const { filter, value } = matchedData(req);

  if (!filter && !value) {
    // If no filter or value is provided, return all users
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (filter && value) {
    // filtering users by query parameters
    const filterCondition = {};
    filterCondition[filter] = {
      contains: value,
    };

    console.log("Constructed filter condition:", filterCondition);

    const users = await prisma.user.findMany({
      where: filterCondition,
    });
    return res.json(users);
  }
};

const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email } = matchedData(req);
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
};

const getuserByIdController = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const { userId } = req;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  res.json(user);
};

const updateUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId } = req;

  console.log(userId);
  const { name, email } = matchedData(req);
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });

  res.json(updatedUser);
};

const deleteuserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req;

  const user = await prisma.user.delete({
    where: { id: userId },
  });

  res.sendStatus(200);
};
export const userControllers = {
  filterUsersController,
  createUserController,
  updateUserController,
  getuserByIdController,
  deleteuserController,
};
