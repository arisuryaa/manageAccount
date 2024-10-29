require("./config/db.js");
const express = require("express");
const app = express();
const port = 3000;
const { body, validationResult } = require("express-validator");
const methodOverride = require("method-override");
const { allAccount, detailAccount, updateAccount, addAccount, deleteAccount, accountByid } = require("./controller/accountController.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/accounts", async (req, res) => {
  const all = await allAccount();
  res.render("accounts", { title: "accounts", all });
});

app.get("/detail/:key", async (req, res) => {
  const detail = await detailAccount(req.params.key);
  res.render("detail-account", { title: "detail", account: detail });
});

app.get("/edit/:key", async (req, res) => {
  const dataOld = await detailAccount(req.params.key);
  res.render("edit-account", { title: "edit", account: dataOld });
});

app.get("/add", (req, res) => {
  res.render("add-account.ejs", { title: "add" });
});

app.delete("/delete", async (req, res) => {
  await deleteAccount(req.body.id);
  res.redirect("/accounts");
});

app.put("/edit-account", [body("email").isEmail().withMessage("masukkan email yang valid mas...`").normalizeEmail()], async (req, res) => {
  const errors = validationResult(req);
  const data = req.body;
  const dataOld = await detailAccount(data.id);
  if (!errors.isEmpty()) {
    res.render("edit-account", { title: "edit", account: dataOld, result: errors.array() });
  } else {
    await updateAccount(data.id, data);
    res.redirect("/accounts");
  }
});

app.post("/add-account", async (req, res) => {
  const data = req.body;
  const sameData = await accountByid(data.type);
  if (sameData && sameData.type === data.type) {
    res.render("add-account", { title: "add", result: ["Jenis Akun sudah terdaftar (tidak boleh sama !)"] });
  } else {
    await addAccount(data);
    res.redirect("/accounts");
  }
});

app.use((req, res) => {
  res.render("error", { title: "error" });
});

app.listen(port, () => {
  console.log(`Port Jalan di http://localhost:${port}`);
});
