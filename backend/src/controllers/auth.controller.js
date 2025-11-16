import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { 
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail 
} from '../mailtrap/email.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const register = async (req, res) => {
    // Handle register logic
    try {
        const {name, email, password, role} = req.body;

        // Check required fields
        if (!name || !email || !password) {
            throw new Error('Missing required fields');
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate email verification token
        // const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            // verificationToken,
            // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();        

        // Generate JWT token
        const token = generateTokenAndSetCookie(res, user._id);
        
        // Send verification email
        // await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please verify your email.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// export const verifyEmail = async (req, res) => {
//     // Handle verify email logic
//     const { code } = req.body;
//     try {
//         const user = await User.findOne({
//             verificationToken: code,
//             verificationTokenExpiresAt: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.verificationTokenExpiresAt = undefined;
//         await user.save();

//         res.status(200).json({ 
//             success: true, 
//             message: "Email verified successfully",
//             user: {
//                 ...user._doc,
//                 password: undefined,
//             },
//         })
//     } catch (error) {
//         console.log("Error in verifyEmail: ", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

export const login = async (req, res) => {
    // Handle signup logic
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                lastLogin: user.lastLogin
            },
        });
    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

// export const forgotPassword = async (req, res) => {
//     // Handle forgot password logic
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ success: false, message: "User not found" });
//         }

//         // Generate reset token
//         const resetToken = crypto.randomBytes(20).toString("hex");
//         const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpiresAt = resetTokenExpiresAt;

//         await user.save();

//         // Send email
//         await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

//         res.status(200).json({ success: true, message: "Password reset link sent to your email" });
//     } catch (error) {
//         console.log("Error in forgotPassword ", error);
//         res.status(400).json({ success: false, message: error.message });
//     }
// }

// export const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;

//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpiresAt: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
//         }

//         // Update password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpiresAt = undefined;
//         await user.save();

//         await sendResetSuccessEmail(user.email);

//         res.status(200).json({ success: true, message: "Password reset successfully " });
//     } catch (error) {
//         console.log("Error in resetPassword ", error);
//         res.status(400).json({ success: false, message: error.message });
//     }
// }

// Get current authenticated user
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ 
            success: true, 
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                lastLogin: req.user.lastLogin,
            }
        });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}