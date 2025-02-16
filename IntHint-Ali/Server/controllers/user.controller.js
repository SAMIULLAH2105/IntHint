import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import transporter from "../utils/nodemail.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


const registerUser = asyncHandler(async (req, res) => {

    const { userName, email, password, confirmPwd } = req.body;

    if (!(userName && email && password && confirmPwd)) {
        throw new ApiError(400, "All fields are required");
    }
    if (password.trim().length < 6) {   //to remve trailing spaces
        throw new ApiError(400, "password must be atleast 6 characters")
    }
    if (password !== confirmPwd) {
        throw new ApiError(409, "Passwords do not match")
    }

    const userExists = await userModel.findOne({
        $or: [{ userName }, { email }]
    })

    if (userExists) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPwd = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
        userName,
        password: hashedPwd,
        email,
    })
    if (!user) {
        throw new ApiError(500, "User creation failed");
    }

    const createdUser = await userModel.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(400, "Error creating user")
    }
    const emailOptions = {
        from: "arsalanali873@gmail.com",
        to: email,
        subject: "Welcome to E-learning",
        text: `Welcome to E-learning. Your account has been created with EmailID: ${email}`, // Plain text fallback
        html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Welcome to Tech Interview Hub!</h2>
        <p>Hello,</p>
        <p>Your account has been successfully created.</p>
        <p><strong>Email ID:</strong> ${email}</p>
        <p>Get ready to explore top interview questions from leading tech companies. You can browse questions, prepare for interviews, and download collections.</p>
        <p>Start preparing today and land your dream job!</p>
        <p>Regards,<br><strong>Tech Interview Hub Team</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer>
            <p style="font-size: 0.9em; color: #555;">Need help? Contact us at support@techinterviewhub.com.</p>
        </footer>
    </body>
    </html>
`

    };

    try {
        await transporter.sendMail(emailOptions);
        console.log("Email sent to: ", email)
    } catch (error) {
        console.error("Email failed:", error); // Log the error
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
})


const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or password is missing");
    }

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
        throw new ApiError(404, "User not found, please register first");
    }

    const checkPwd = await bcryptjs.compare(password, userExists.password);
    if (!checkPwd) {
        throw new ApiError(400, "Incorrect password");
    }

    const accessToken = jwt.sign(
        { id: userExists._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000,
    });

    const refreshToken = jwt.sign(
        { id: userExists._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    userExists.refreshToken = refreshToken;
    await userExists.save();

    const loggedInUser = await userModel.findById(userExists._id).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, { loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logOut = asyncHandler(async (req, res) => {
    await userModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    res.clearCookie("accessToken").clearCookie("refreshToken");
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});

const sendPwdResetOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
        throw new ApiError(404, "User not found");
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Generated OTP:", otp);

    foundUser.resetOtp = otp;
    foundUser.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await foundUser.save();

    const mailOptions = {
        from: "arsalanali873@gmail.com",
        to: foundUser.email,
        subject: "Password Reset OTP",
        html: `<p>Your OTP is <b>${otp}</b>. Use this to reset your password. It is valid for 15 minutes.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error sending email", error?.message);
        return res.status(500).json({ success: false, message: "Error sending OTP. Try again later." });
    }
});

const resetPwd = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        throw new ApiError(404, "No user with this email ID found");
    }

    if (!user.resetOtp || user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) {
        throw new ApiError(401, "Invalid or expired OTP");
    }

    user.password = await bcryptjs.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.status(200).json(new ApiResponse(200, "Password updated successfully"));
});


const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!(oldPassword && newPassword && confirmPassword)) {
        throw new ApiError(400, "All fields are required")
    }
    if (newPassword.trim().length < 6) {
        throw new ApiError(409, "Length of new Password should be atleast 6 characters");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(409, "Both new and confirm password should be same")
    }
    const hashNewPwd = await bcryptjs.hash(newPassword, 10);

    const user = await userModel.findOne(req.user?._id)
    if (!user) {
        throw new ApiError(404, "No such user found with this ID")
    }
    //checking if old password is correct or not

    const isOldPwdCorrect = await bcryptjs.compare(oldPassword, user.password);
    if (!isOldPwdCorrect) {
        throw new ApiError(400, "the password you provided does not match the pwd stored in DB")
    }

    user.password = hashNewPwd;

    await user.save();

    return res.status(200).json(new ApiResponse(200, "Password updated successfully"))
})
const deleteAccount = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(400, "User ID is missing or invalid");
    }

    const userID = req.user._id;
    const findUser = await userModel.findById(userID).select("userName");

    if (!findUser) {
        throw new ApiError(404, "No such user exists");
    }

    const deletedUser = await userModel.findByIdAndDelete(userID);
    
    if (!deletedUser) {
        throw new ApiError(500, "Error deleting user");
    }

    return res.status(200).json(
        new ApiResponse(200, `${findUser.userName}, your account has been deleted successfully`)
    );
});

export {
    registerUser,logInUser,logOut,resetPwd,sendPwdResetOTP,changePassword,deleteAccount
}