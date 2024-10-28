const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/dataAkun"; // Tambahkan mongodb://

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => console.log("Koneksi ke MongoDB berhasil"))
  .catch((err) => console.error("Koneksi ke MongoDB gagal:", err));
