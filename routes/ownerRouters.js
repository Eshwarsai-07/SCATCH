const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res
                    .status(403)
                    .send("You don't have permission to create a new owner");
            }
            let { fullname, email, password } = req.body;
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            res.status(201).send(createdOwner);
        } catch (error) {
           
            console.error(error);
            res.status(500).send("An error occurred while creating a new owner");
        }
    });
}
router.get("/admin", function (req, res) {
    let success = req.flash("success") || "";
    let error = req.flash("error") || "";
    res.render("createproducts", { success, error });
});




module.exports = router;