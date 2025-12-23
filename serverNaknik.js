// import { readFromFile, writeToFile, getNextId } from "./utils.js";
// import express from "express";
// import fs from "fs/promises";

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// app.get("/users", async (req, res) => {
//   try {
//     const usersArr = await readFromFile("users.json");
//     res.json(usersArr);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

// app.get("/user/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const usersArr = await readFromFile("users.json");
//     const user = usersArr.filter((u) => u.id == id);
//     if (user.length <= 0) {
//       res.status(404).json({ mes: "id is not found" });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ err });
//   }
// });

// app.get("/users/search", async (req, res) => {
//   try {
//     const { city } = req.query;
//     const users = await readFromFile("users.json");
//     console.log(typeof users);
//     const user = users.filter((u) => u.city === city);
//     if (user.length <= 0) {
//       res.status(404).json({ mes: "id is not found" });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     const targetArr = await readFromFile("users.json");
//     const newUser = {
//       id: getNextId(targetArr),
//       name: req.body?.name || "",
//       age: req.body?.age || 0,
//       city: req.body?.city || "",
//     };
//     targetArr.push(newUser);
//     await writeToFile("users.json", targetArr);
//     res.status(201).json({ msg: "success", data: req.body });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "error" + err.message, data: null });
//   }
// });

// app.put("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { body } = req;
//     const intId = parseInt(id);
//     if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
//     const ListUsers = await readFromFile("users.json");
//     const user = ListUsers.find((t) => t.id === intId);
//     console.log(user);
//     console.log(body);
//     if (!user) {
//       res.status(404).json({ success: false, data: {} });
//     } else {
//       user.name = body.name || user.name;
//       user.age = body.age || user.age;
//       user.city = body.city || user.city;

//       await writeToFile("users.json", ListUsers);
//       res.status(200).json({ success: true, data: user });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, data: error.message });
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const intId = parseInt(id);

//     if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
//     const users = await readFromFile("users.json");
//     const user = users.find((u) => u.id === intId);

//     if (!user) {
//       res.status(404).json({ success: false, data: {} });
//     } else {
//       const indexToDelete = users.findIndex((t) => t.id === intId);

//       users.splice(indexToDelete, 1);
//       await writeToFile("users.json", users);

//       res.status(200).json({ success: true, data: {} });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, data: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
