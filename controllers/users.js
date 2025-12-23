import { readFromFile, writeToFile, getNextId } from "../utils.js";
import path from "path";

const __dirname = path.resolve();
const TODOS_PATH =
  process.env.TODOS_PATH || path.join(__dirname, "data", "users.json");

export const getUsers = async (req, res) => {
  try {
    const usersArr = await readFromFile("data/users.json");
    res.json(usersArr);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usersArr = await readFromFile("data/users.json");
    const user = usersArr.filter((u) => u.id == id);
    if (user.length <= 0) {
      res.status(404).json({ mes: "id is not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ err });
  }
};

export const GetUsersByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const users = await readFromFile("data/users.json");
    console.log(typeof users);
    const user = users.filter((u) => u.city === city);
    console.log(user);
    
    if (user.length === 0) {
      res.status(404).json({ mes: "id is not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const targetArr = await readFromFile("data/users.json");
    const newUser = {
      id: getNextId(targetArr),
      name: req.body?.name || "",
      age: req.body?.age || 0,
      city: req.body?.city || "",
    };
    targetArr.push(newUser);
    await writeToFile("data/users.json", targetArr);
    res.status(201).json({ msg: "success", data: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const chengeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const ListUsers = await readFromFile("data/users.json");
    const user = ListUsers.find((t) => t.id === intId);
    console.log(user);
    console.log(body);
    if (!user) {
      res.status(404).json({ success: false, data: {} });
    } else {
      user.name = body.name || user.name;
      user.age = body.age || user.age;
      user.city = body.city || user.city;

      await writeToFile("data/users.json", ListUsers);
      res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const DelUser = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const users = await readFromFile("data/users.json");
    const user = users.find((u) => u.id === intId);

    if (!user) {
      res.status(404).json({ success: false, data: {} });
    } else {
      const indexToDelete = users.findIndex((t) => t.id === intId);

      users.splice(indexToDelete, 1);
      await writeToFile("data/users.json", users);

      res.status(200).json({ success: true, data: {} });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};
