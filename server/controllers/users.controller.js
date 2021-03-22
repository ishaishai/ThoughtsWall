const UsersSchema = require("../models/users.model");
const imagesSchema = require("../models/images.model");

const fs = require("fs");

exports.getProfile = async (req, res) => {
  const userToFind = req.query.username;

  try {
    user = await UsersSchema.find(
      { username: userToFind },
      "-__v -_id -Thoughts -Comments -password"
    ).lean();
    res.status(200).json({ userProfile: user[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  //
  // define this func better. sort it.
  //
  const userToFind = req.user.username;
  let image = req.file;
  let description = req.body.detailsText;

  let encodedImg = fs.readFileSync(image.path).toString("base64");

  user = await UsersSchema.find({ username: userToFind }, "_id").lean();

  let finalImg = {
    username: user[0]["_id"],
    name: image.originalname,
    img: { data: encodedImg, contentType: image.mimetype },
  };
  let newUpload;
  try {
    let uploadImg = new imagesSchema(finalImg);
    newUpload = await uploadImg.save();
  } catch (e) {
    await imagesSchema.updateOne(
      { username: finalImg.username },
      {
        name: finalImg.name,
        img: finalImg.img,
      }
    );

    let picId = await imagesSchema
      .findOne({ username: finalImg.username }, "_id")
      .lean();

    await UsersSchema.updateOne(
      { _id: finalImg.username },
      { img: picId["_id"] }
    );

    await fs.unlink(image.path, () => {
      console.log("file deleted");
    });
    res.status(200).send({ msg: "OK" });
  }

  // await UsersSchema.updateOne(
  //   { _id: user[0]["_id"] },
  //   { img: newUpload["_id"] }
  // );
};
