// import requirements
const router = require("express").Router();
const controller = require("../controller/controller");
const authCredential = require("../middleware/authCredential");

// create routes for all different user end points
router.post("/register", controller.registerUser);
router.post("/login", controller.login);
router.post("/delete", authCredential, controller.deleteUser);
router.post("/updateUsers", authCredential, controller.updateUsers);
router.post("/readUsers", authCredential, controller.readUsers);

// create routes for all different credential end points
router.post("/createCredentials", authCredential, controller.createCredentials);
router.post("/readCredentials", authCredential, controller.readCredentials);
router.post("/updateCredentials", authCredential, controller.updateCredentials);
router.post("/deleteCredentials", authCredential, controller.deleteCredentials);

// export module
module.exports = router;
