const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut); // pass the reference

router.post("/", usersPost);

router.delete("/", usersDelete);

module.exports = router;
