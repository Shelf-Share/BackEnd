require("dotenv").config();

const { user } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");

const list = async (req, res) => {
    try {
        const jwtUserId = res.sessionLogin.id; // From checktoken middleware
        const data = await user.findFirst({
            where: { id: jwtUserId },
        });

        if (data) {
            delete data.password; // hide password field in response
            return res.status(201).json({
                error: false,
                message: "Muat profil berhasil",
                response: data,
            });
        } else {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};

const profile = async (req, res) => {
    const { full_name, phone_number, city, country } = req.body;
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    try {
        const jwtUserId = res.sessionLogin.id; // From checktoken middleware
        let updatedData = {
            fullName: full_name,
            phoneNumber: phone_number,
            city: city,
            country: country,
        };

        if (req.file) {
            if (!allowedImageTypes.includes(req.file.mimetype)) {
                return res.status(400).json({
                    error: true,
                    message: "Jenis File tidak diizinkan",
                });
            }

            const fileTostring = req.file.buffer.toString("base64");
            const uploadFile = await utils.imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring,
            });

            updatedData.imageUrl = uploadFile.url;
        }

        if (Object.keys(updatedData).length === 0) {
            return res.json({
                success: true,
                message: "Tidak ada perubahan yang diperbarui",
            });
        }

        const data = await user.update({
            where: { id: parseInt(jwtUserId) },
            data: updatedData,
        });

        if (data) {
            delete data.password; // hide password field in response
            return res.status(201).json({
                error: false,
                message: "Pembaruan profil berhasil",
                response: data,
            });
        } else {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};

const changePassword = async (req, res) => {
    const { old_password, new_password, confirm_password } = req.body;

    try {
        const jwtUserId = res.sessionLogin.id; // From checktoken middleware
        const findUser = await user.findUnique({
            where: { id: jwtUserId },
        });

        if (findUser && bcrypt.compareSync(old_password, findUser.password)) {
            if (new_password === confirm_password) {
                const data = await user.update({
                    where: { id: jwtUserId },
                    data: { password: await utils.encryptPassword(new_password) },
                });

                if (data) {
                    delete data.password; // hide password field in response
                    return res.status(200).json({
                        error: false,
                        message: "Ubah kata sandi berhasil",
                        response: data,
                    });
                }
            } else {
                return res.status(403).json({
                    error: true,
                    message: "Konfirmasi kata sandi tidak cocok",
                });
            }
        } else {
            return res.status(403).json({
                error: true,
                message: "Kata sandi lama Anda salah",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: "Gagal keluar",
                });
            }
            return res.status(200).json({
                error: false,
                message: "Logout berhasil",
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};

const changeAvatar = async (req, res) => {
    try {
        const jwtUserId = res.sessionLogin.id; // From checktoken middleware
        const { newAvatarUrl } = req.body;

        const data = await user.update({
            where: { id: jwtUserId },
            data: { imageUrl: newAvatarUrl },
        });

        if (data) {
            return res.status(200).json({
                error: false,
                message: "Avatar berhasil diperbarui",
            });
        } else {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    list,
    profile,
    changePassword,
    logout,
    changeAvatar,
};
