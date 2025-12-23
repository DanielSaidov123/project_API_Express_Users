import express from "express";
import { getUsers,getUser ,CreateUser, chengeUser, DelUser, GetUsersByCity} from "../controllers/users.js";

const router = express.Router();



router.route('/search').get(GetUsersByCity)
router.route("/").get(getUsers).post(CreateUser)
router.route("/:id").get(getUser).put(chengeUser).delete(DelUser)



export default router;