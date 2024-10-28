const user = require("../models/accounts.js");

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

module.exports = { allAccount, detailAccount, updateAccount, addAccount, deleteAccount };
