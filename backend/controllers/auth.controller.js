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
        const verificationToken = generateVerificationToken(); // Implement this function to generate a code
        const user = new User({
            email,
            password: hashedPassword,
            name,
        })
    } catch (error) {

    }
};

export const login = (req, res) => {
    // Handle signup logic here
    res.send('Signup route');
};

export const logout = (req, res) => {
    // Handle signup logic here
    res.send('Signup route');
};