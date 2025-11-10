import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-"); // thay thế khoảng trắng và ký tự đặc biệt bằng dấu gạch ngang

const sampleBlogs = [
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
  },
  {
        title: "Cherry Blossom Season in Japan",
    content: `Springtime in Japan is magical, with cherry blossoms (sakura) blooming across the country. Parks and temples become pink wonderlands, attracting locals and tourists alike.

Top viewing spots:
- Ueno Park, Tokyo
- Philosopher's Path, Kyoto
- Hirosaki Castle, Aomori`,
    tags: ["Sakura", "Spring", "Nature"],
    status: "published",
    isPublished: true,
  },
  {
    title: "A Guide to Japanese Tea Ceremony",
    content: `The Japanese tea ceremony (chanoyu) is a ritual of harmony, respect, purity, and tranquility. It reflects Zen principles and centuries of tradition.

Key elements:
- Matcha preparation
- Tatami room etiquette
- Seasonal sweets`,
    tags: ["Tea", "Culture", "Tradition"],
    status: "published",
    isPublished: true,
  },
  {
    title: "Exploring Hokkaido in Winter",
    content: `Hokkaido transforms into a snowy paradise in winter. From skiing in Niseko to soaking in hot springs, it's a dream for cold-weather travelers.

Highlights:
- Sapporo Snow Festival
- Ice fishing in Lake Akan
- Snow monkeys in hot springs`,
    tags: ["Hokkaido", "Winter", "Adventure"],
    status: "published",
    isPublished: true,
  },
  {
    title: "Japanese Architecture: Minimalism Meets Nature",
    content: `Japanese architecture blends simplicity with natural elements. From traditional wooden homes to modern concrete designs, it emphasizes harmony and function.

Notable styles:
- Shoji screens
- Engawa corridors
- Tadao Ando's concrete works`,
    tags: ["Architecture", "Design", "Minimalism"],
    status: "draft",
    isPublished: false,
  },
  {
    title: "Top 5 Japanese Festivals You Must Experience",
    content: `Japan hosts vibrant festivals year-round, each with unique traditions, music, and food.

Must-see matsuri:
1. Gion Matsuri – Kyoto
2. Nebuta Matsuri – Aomori
3. Tanabata – Sendai
4. Kanda Matsuri – Tokyo
5. Yuki Matsuri – Sapporo`,
    tags: ["Festivals", "Culture", "Events"],
    status: "published",
    isPublished: true,
  },
  {
    title: "How to Travel Japan on a Budget",
    content: `Japan can be affordable with smart planning. Use rail passes, eat at konbini, and stay in capsule hotels to save money.

Tips:
- JR Pass for long-distance travel
- 100-yen shops for essentials
- Free temple visits`,
    tags: ["Budget Travel", "Tips", "Japan"],
    status: "published",
    isPublished: true,
  },
  {
    title: "The Art of Bento: Japanese Lunch Boxes",
    content: `Bento boxes are more than meals—they're expressions of care and creativity. Learn how to make balanced, beautiful bentos at home.

Components:
- Rice or noodles
- Protein (fish, meat, tofu)
- Pickled and fresh vegetables`,
    tags: ["Food", "Bento", "Culture"],
    status: "draft",
    isPublished: false,
  },
  {
    title: "A Day in Osaka: Food and Fun",
    content: `Osaka is Japan’s kitchen and entertainment hub. Spend a day exploring its street food, shopping arcades, and quirky museums.

Top spots:
- Dotonbori
- Kuromon Market
- Osaka Castle`,
    tags: ["Osaka", "Food", "Travel"],
    status: "published",
    isPublished: true,
  },
  {
    title: "Japanese Calligraphy: Beauty in Brushstrokes",
    content: `Shodo, or Japanese calligraphy, is a meditative art form. It combines aesthetics with discipline, using brush and ink to express emotion.

Styles:
- Kaisho (block)
- Gyosho (semi-cursive)
- Sosho (cursive)`,
    tags: ["Art", "Calligraphy", "Zen"],
    status: "draft",
    isPublished: false,
  },
  {
    title: "Navigating Tokyo’s Train System Like a Pro",
    content: `Tokyo’s train system is vast but efficient. With a few tips, you can master it and travel like a local.

Essentials:
- Suica/Pasmo cards
- Transfer etiquette
- Station signage decoding`,
    tags: ["Tokyo", "Transport", "Tips"],
    status: "published",
    isPublished: true,
    }
];

const seedBlogs = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log("🧹 Cleared existing blogs");

    // Get a sample user to be the author
    const user = await User.findOne();
    if (!user) {
      console.log("❌ No users found. Please run user seeds first.");
      process.exit(1);
    }

    // Add author and metadata to each blog
    const blogsWithAuthor = sampleBlogs.map((blog) => ({
      ...blog,
      slug: slugify(blog.title),
      author: user._id,
      meta: {
        views: Math.floor(Math.random() * 1000),
      },
      likes: Math.floor(Math.random() * 100),
    }));

    // Insert blogs
    await Blog.insertMany(blogsWithAuthor);
    console.log("🌱 Sample blogs seeded successfully");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("📝 Seed complete!");
  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
    process.exit(1);
  }
};

// Run seeder
seedBlogs();
