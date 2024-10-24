const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { Mongoose } = require("mongoose");
require("dotenv").config();

// update the additional details in the profile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const {
      about,
      branchName,
      cityName,
      collegeName,
      contactNumber,
      dateOfBirth,
      departmentName,
      enrollmentNumber,
      firstName,
      gender,
      lastName,
      year,
    } = req.body.data;

    // get userId
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // console.log("USERDETAILS", userDetails);
    const profileId = userDetails.additionalDetails;

    const profileDetails = await Profile.findById(profileId);
    // console.log("profileDetails", profileDetails);

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    profileDetails.enrollmentNumber = enrollmentNumber;
    profileDetails.year = year;
    profileDetails.collegeName = collegeName;
    profileDetails.departmentName = departmentName;
    profileDetails.branchName = branchName;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    profileDetails.cityName = cityName;
    await profileDetails.save();

    // console.log("USERDETAILS 2", userDetails);
    // console.log("profileDetails 2", profileDetails);
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      updatedUserDetails: updatedUserDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
      error: err.message,
    });
  }
};

// delete account
exports.deleteAccount = async (req, res) => {
  try {
    // fetch id
    const userId = req.user.id;
    const { currentPassword } = req.body;
    // console.log("currentPassword ->", currentPassword);
    // validate
    const userData = await User.findById(userId);
    // console.log("userDetails ->", userData);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (await bcrypt.compare(currentPassword, userData.password)) {
      // delete profile
      await Profile.findByIdAndDelete({ _id: userData?.additionalDetails });
      // delete related likes
      await Post.updateMany({}, { $pull: { likes: userId } }, { new: true });
      // const commentUser = Mongoose.Types.ObjectId(userId);
      if (await Comment.find({ userDetails: userId })) {
        const comments = await Comment.find({ userDetails: userId });
        // console.log("COMMENTS", comments);
        if (comments) {
          await Post.updateMany(
            {},
            { $pull: { comments: { $in: comments } } },
            { new: true }
          );
          comments.forEach((element) => {
            Comment.deleteMany({ _id: element._id });
          });
        }
      }
      // delete related post
      await Post.deleteMany({ _id: { $in: userData.posts } });
      // deleted related followings
      // delete related followers
      // await User.find({}, { $pull: { follower: userId } }, { new: true });
      // await User.find({}, { $pull: { pendingFollowing: userId } }, { new: true });

      // delete user
      await User.findByIdAndDelete({ _id: userId });
      // return response
      return res.status(200).json({
        success: true,
        data: userData,
        message: "User Deleted successfully.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Unable to delete profile. Wrong Password",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete profile.",
      error: err.message,
    });
  }
};

// get all details of user
exports.getUserDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // get user details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched User details successfully.",
      data: userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Details.",
      error: err.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // get id
    const { userName } = req.query;
    // console.log("USERNAME", userName);
    // get user details
    const userProfile = await User.findOne({ userName: userName })
      .populate("additionalDetails")
      .exec();

    // validation
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    // console.log("userProfile", userProfile);
    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched User Profile successfully.",
      data: userProfile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Profile.",
      error: err.message,
    });
  }
};

// update the profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("UserId -> ", userId);
    // console.log("Type of userId -> ", typeof userId);
    const profilePicture = req.files.profilePicture;
    const folderName = process.env.FOLDER_NAME;
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = profilePicture.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }

    const response = await uploadImageToCloudinary(profilePicture, folderName);
    // console.log("response -> ", response);

    const userDetails = await User.findByIdAndUpdate(userId);
    userDetails.profileImage = response.secure_url;
    await userDetails.save();
    // console.log("User Details -> ", userDetails);

    return res.json({
      success: true,
      image_url: response.secure_url,
      message: "Image Uploaded successfully",
      updatedUserDetails: userDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let allUsers = await User.find({})
      .sort({ createdAt: -1 })
      .populate("additionalDetails")
      .exec();

    // validation
    if (!allUsers) {
      return res.status(404).json({
        success: false,
        message: "Users not found.",
      });
    }
    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched Users successfully.",
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get users.",
      error: err.message,
    });
  }
};
