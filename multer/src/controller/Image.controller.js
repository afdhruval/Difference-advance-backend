const imageModel = require("../model/ImageModel");
const ImageKit = require("@imagekit/nodejs");
const config = require("../config/config");
const fs = require("fs");

const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

const showImage = async (req, res) => {
    try {
        const images = await imageModel.find();
        res.render("index", { images });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).send("Error fetching images");
    }
};

const uploadImage = async (req, res) => {
    console.log("HEADERS =>", req.headers);
    console.log("REQ FILE => ", req.file);

    if (!req.file) {
        return res.status(400).send("No file uploaded. Please select an image.");
    }

    try {
        // Read file from local storage
        const fileContent = fs.readFileSync(req.file.path);

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: fileContent, //required
            fileName: req.file.originalname, //required
        });

        console.log("ImageKit Upload Response:", uploadResponse);

        // Save to Database
        await imageModel.create({
            imageUrl: uploadResponse.url,
            fileId: uploadResponse.fileId
        });

        // Delete local file after successful upload
        fs.unlinkSync(req.file.path);

        res.redirect("/");
    } catch (error) {
        console.error("Upload Error:", error);

        // Clean up local file even if upload fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).send("Internal Server Error during upload");
    }
};

module.exports = {
    showImage,
    uploadImage,
};
