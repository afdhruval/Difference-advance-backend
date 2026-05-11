const imageModel = require("../model/ImageModel");

const showImage = async (req, res) => {
    const images = await imageModel.find();
    res.render("index", { images });
};

const uploadImage = async (req, res) => {
    console.log("HEADERS =>", req.headers);
    console.log("REQ FILE => ", req.file);
    
    // 1. Check if the file exists before accessing its properties
    if (!req.file) {
        return res.status(400).send("No file uploaded. Please select an image.");
    }

    try {
        const image = await imageModel.create({
            image: req.file.filename,
        });
        res.redirect("/");
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    showImage,
    uploadImage,
};
