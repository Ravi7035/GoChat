import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.json({ message: "signup route" });
});

router.get("/login", (req, res) => {
  res.json({ message: "login route" });
});

router.get("/logout", (req, res) => {
  res.json({ message: "logout route" });
});

export default router;
