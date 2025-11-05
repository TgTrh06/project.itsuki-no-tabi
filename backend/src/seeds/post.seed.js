import mongoose from 'mongoose';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const samplePosts = [
    {
        title: "Tokyo: A Modern Marvel",
        content: `Exploring Tokyo's blend of tradition and innovation. From the serene Meiji Shrine to the bustling streets of Shibuya, Tokyo represents Japan's fascinating duality. 

The city's efficient train system connects ancient temples with futuristic districts, creating an unforgettable urban tapestry.

Must-visit spots:
- Sensō-ji Temple
- Shibuya Crossing
- Akihabara Electric Town
- Tsukiji Outer Market`,
        tags: ["Tokyo", "Travel", "Culture"],
        status: "published",
        isPublished: true,
    },
    {
        title: "Kyoto's Hidden Gardens",
        content: `Discovering the peaceful gardens of Kyoto's temples. The changing seasons paint these gardens in different colors, from spring cherry blossoms to autumn maples.

Each garden tells a story through carefully placed stones, pruned trees, and raked gravel. The philosophical principles of Japanese gardening create spaces for meditation and reflection.

Notable gardens:
- Ryoan-ji Temple's rock garden
- Arashiyama Bamboo Grove
- Kinkaku-ji's golden reflection
- Ginkaku-ji's sand garden`,
        tags: ["Kyoto", "Gardens", "Zen"],
        status: "published",
        isPublished: true,
    },
    {
        title: "Japanese Street Food Guide",
        content: `A journey through Japan's vibrant street food scene. From late-night ramen to festival takoyaki, street food reveals the heart of Japanese cuisine.

Local favorites:
1. Takoyaki - Octopus balls from Osaka
2. Yakitori - Grilled chicken skewers
3. Taiyaki - Fish-shaped sweet treats
4. Okonomiyaki - Savory pancakes

Each region has its own specialties and cooking styles.`,
        tags: ["Food", "Culture", "Travel Tips"],
        status: "published",
        isPublished: true,
    },
    {
        title: "Mount Fuji Hiking Guide",
        content: `Planning your Mount Fuji climb. This iconic symbol of Japan attracts thousands of hikers each season.

Essential tips:
- Best climbing season: July to early September
- Choose from 4 main trails
- Proper gear and preparation
- Mountain hut reservations

The sunrise view from the summit makes every step worthwhile.`,
        tags: ["Mount Fuji", "Hiking", "Adventure"],
        status: "draft",
        isPublished: false,
    },
    {
        title: "Onsen Etiquette",
        content: `Your guide to Japanese hot springs. Onsen are an integral part of Japanese culture, offering both relaxation and social connection.

Basic rules:
- Wash thoroughly before entering
- No swimsuits allowed
- Keep quiet and respectful
- Don't put towels in the water

Popular onsen regions include Hakone, Kusatsu, and Beppu.`,
        tags: ["Onsen", "Culture", "Travel Tips"],
        status: "draft",
        isPublished: false,
    }
];

const seedPosts = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Clear existing posts
        await Post.deleteMany({});
        console.log("🧹 Cleared existing posts");

        // Get a sample user to be the author
        const user = await User.findOne();
        if (!user) {
            console.log("❌ No users found. Please run user seeds first.");
            process.exit(1);
        }

        // Add author and metadata to each post
        const postsWithAuthor = samplePosts.map(post => ({
            ...post,
            author: user._id,
            meta: {
                views: Math.floor(Math.random() * 1000),
            },
            likes: Math.floor(Math.random() * 100),
        }));

        // Insert posts
        await Post.insertMany(postsWithAuthor);
        console.log("🌱 Sample posts seeded successfully");

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log("📝 Seed complete!");

    } catch (error) {
        console.error("❌ Error seeding posts:", error);
        process.exit(1);
    }
};

// Run seeder
seedPosts();