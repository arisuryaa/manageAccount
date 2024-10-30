const user = require("../models/accounts.js");
const bcrypt = require("bcrypt");
const admin = require("../models/admin.js");

const allAccount = async () => {
  try {
    const dataAll = await user.find({});
    if (!dataAll || dataAll.length === 0) {
      console.log("Tidak ada data akun ditemukan.");
    } else {
      return dataAll;
    }
  } catch (err) {
    console.error("Terjadi kesalahan saat mengambil data:", err.message);
  }
};

const detailAccount = async (id) => {
  try {
    const dataDetail = await user.findOne({ _id: id });
    if (!dataDetail) {
      throw new Error("data tidak ada");
    } else {
      return dataDetail;
    }
  } catch (err) {
    console.log(err);
  }
};

const updateAccount = async (id, newData) => {
  try {
    const update = await user.findByIdAndUpdate(id, {
      $set: {
        type: newData.type,
        email: newData.email,
        password: newData.password,
      },
    });
    return update;
  } catch (err) {
    console.log(err);
  }
};

const addAccount = async (data) => {
  try {
    const add = await user.create(data);
    return update;
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = async (id) => {
  try {
    const result = await user.deleteOne({ _id: id }); // Gunakan `_id` untuk pencarian
    if (result.deletedCount === 0) {
      console.log("Tidak ada akun ditemukan dengan ID tersebut.");
    } else {
      console.log("Akun berhasil dihapus.");
    }
  } catch (err) {
    console.error("Terjadi kesalahan saat menghapus akun:", err.message);
  }
};

const accountByid = async (type) => {
  try {
    const dataDetail = await user.findOne({ type: type });
    if (!dataDetail) {
      throw new Error("data tidak ada");
    } else {
      return dataDetail;
    }
  } catch (err) {
    console.log(err);
  }
};

const register = async (data) => {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRound);
    const account = {
      username: data.username,
      password: hashPassword,
    };
    const insert = await admin.create(account);
    if (!insert) {
      throw new Error("gagal register");
    } else {
      console.log("data berhasil ditambah");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { allAccount, detailAccount, updateAccount, addAccount, deleteAccount, accountByid, register };
