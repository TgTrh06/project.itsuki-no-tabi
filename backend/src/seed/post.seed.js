// backend/src/seed/seedBlogs.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Post } from "../models/post.model.js";

dotenv.config();

const posts = [
  {
    title: "Khám phá Kyoto cổ kính – Hành trình về miền ký ức",
    content:
      "Kyoto – cố đô của Nhật Bản – là nơi lưu giữ những giá trị truyền thống ngàn năm. Dạo quanh Fushimi Inari, bạn sẽ bắt gặp hàng nghìn cổng Torii đỏ rực nối dài bất tận.",
    imageUrl: "https://images.unsplash.com/photo-kyoto.jpg",
  },
  {
    title: "Ẩm thực Tokyo – Thiên đường của những tín đồ ăn uống",
    content:
      "Tokyo không chỉ là thủ đô hiện đại mà còn là điểm đến của hàng nghìn quán ăn Michelin. Từ sushi Tsukiji đến ramen Ichiran, mọi trải nghiệm đều đáng giá.",
    imageUrl: "https://images.unsplash.com/photo-tokyo-food.jpg",
  },
  {
    title: "Leo núi Phú Sĩ – Biểu tượng hùng vĩ của Nhật Bản",
    content:
      "Mỗi mùa, núi Phú Sĩ lại khoác lên mình một vẻ đẹp riêng. Hành trình leo núi là thử thách và cũng là niềm tự hào cho những ai chinh phục đỉnh cao 3.776m.",
    imageUrl: "https://images.unsplash.com/photo-fuji.jpg",
  },
  {
    title: "Hokkaido mùa đông – Tuyết trắng và lễ hội ánh sáng",
    content:
      "Hokkaido vào mùa đông là bức tranh tuyệt đẹp với tuyết phủ trắng xóa. Đừng bỏ lỡ lễ hội Sapporo Snow Festival cùng món súp miso nồng ấm.",
    imageUrl: "https://images.unsplash.com/photo-hokkaido.jpg",
  },
  {
    title: "Okinawa – Hòn ngọc phương Nam của Nhật Bản",
    content:
      "Okinawa gây thương nhớ với biển xanh, cát trắng và văn hóa Ryukyu độc đáo. Đây là điểm đến lý tưởng cho kỳ nghỉ dưỡng biển nhiệt đới.",
    imageUrl: "https://images.unsplash.com/photo-okinawa.jpg",
  },
  {
    title: "Khám phá Osaka – Thành phố của sự năng động và ẩm thực đường phố",
    content:
      "Osaka là nơi giao thoa giữa truyền thống và hiện đại. Những món như takoyaki hay okonomiyaki sẽ khiến bạn mê mẩn không rời.",
    imageUrl: "https://images.unsplash.com/photo-osaka.jpg",
  },
  {
    title: "Nagoya – Thành phố công nghiệp với linh hồn Samurai",
    content:
      "Dù hiện đại, Nagoya vẫn lưu giữ dấu ấn lịch sử qua Lâu đài Nagoya và bảo tàng xe Toyota – biểu tượng cho tinh thần sáng tạo Nhật Bản.",
    imageUrl: "https://images.unsplash.com/photo-nagoya.jpg",
  },
  {
    title: "Nara – Nơi hươu thần tự do dạo chơi giữa lòng thành phố",
    content:
      "Nara mang đến cảm giác thanh bình. Bạn có thể cho hươu ăn bánh senbei và chiêm ngưỡng tượng Đại Phật tại chùa Todaiji nổi tiếng.",
    imageUrl: "https://images.unsplash.com/photo-nara.jpg",
  },
  {
    title: "Kobe – Thưởng thức bò wagyu trứ danh",
    content:
      "Thịt bò Kobe – niềm tự hào của Nhật Bản – là món ăn bạn nhất định phải thử một lần trong đời. Hương vị mềm tan, béo ngậy không thể quên.",
    imageUrl: "https://images.unsplash.com/photo-kobe-beef.jpg",
  },
  {
    title: "Hành trình theo dấu hoa anh đào – Sakura khắp Nhật Bản",
    content:
      "Từ Tokyo đến Hirosaki, mùa hoa anh đào mang đến khung cảnh lãng mạn nhất năm. Hãy chuẩn bị máy ảnh và trái tim đầy cảm xúc!",
    imageUrl: "https://images.unsplash.com/photo-sakura.jpg",
  },
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Post.deleteMany(); // Xóa dữ liệu cũ
    await Post.insertMany(posts);
    console.log("✅ Đã thêm 10 blog demo thành công!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Lỗi khi seed blogs:", err);
    mongoose.connection.close();
  }
};

seedBlogs();
