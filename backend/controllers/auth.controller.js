import express from 'express';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    // Handle signup logic
    const {email, password, name} = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error('Missing required fields');
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now();
        })
    } catch (error) {

    }
};

export const login = (req, res) => {
    // Handle signup logic here
    res.send('Signup route');
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = (req, res) => {}

export const resetPassword = (req, res) => {}

export const checkAuth = (req, res) => {}
