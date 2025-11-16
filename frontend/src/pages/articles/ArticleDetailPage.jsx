import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useArticleStore from '../../store/articleStore'
import useCommentStore from '../../store/commentStore'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

export default function ArticleDetailPage() {
  const { city, slug } = useParams()
  const { user } = useAuthStore() // Lấy thông tin người dùng

  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)

  const [commentContent, setCommentContent] = useState('')
  const [isLiking, setIsLiking] = useState(false)

  const { getArticleBySlug, likeArticle } = useArticleStore() // Cần likeArticle
  const { comments, fetchComments, addComment, loading: commentLoading } = useCommentStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        // Backend getArticleBySlug đã trả về article và comments, nhưng ta dùng fetchComments riêng.
        const { article: fetchedArticle } = await getArticleBySlug(city, slug)
        setArticle(fetchedArticle)

        if (fetchedArticle) fetchComments(fetchedArticle._id)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [city, slug, getArticleBySlug, fetchComments])

  // 2. HANDLE COMMENT SUBMISSION
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Login to leave a comment")
      return
    }
    if (!commentContent.trim()) {
      toast.error("Comment cannot be empty")
      return
    }

    try {
      await addComment(article._id, commentContent.trim())
      setCommentContent('')
      toast.success("Comment added successfully")
    } catch (error) {
      toast.error(error.message || "Error in comment.")
    }
  }

  // 3. HANDLE LIKE BUTTON
  const handleLike = async () => {
    if (!user) {
      toast.error("Login required to like the article");
      return;
    }
    if (isLiking) return;

    setIsLiking(true);
    try {
      // 1. GỌI API TOGGLE LIKE
      // Bạn không cần dùng giá trị trả về (likesCount) nếu cập nhật mảng local.
      await likeArticle(article._id);

      // 2. CẬP NHẬT STATE ARTICLE CỤC BỘ DỰA TRÊN LOGIC BACKEND

      const userIdString = user._id.toString();
      const currentLikes = article.meta?.likes || [];

      // Sử dụng .some() và .toString() để kiểm tra trạng thái like hiện tại
      const isCurrentlyLiked = currentLikes.some(id => id.toString() === userIdString);

      let newLikesArray;
      if (isCurrentlyLiked) {
        // UNLIKE: Loại bỏ ID người dùng khỏi mảng likes (dựa trên string comparison)
        newLikesArray = currentLikes.filter(id => id.toString() !== userIdString);
        toast.success("Unliked article.");
      } else {
        // LIKE: Thêm ID người dùng vào mảng likes
        newLikesArray = [...currentLikes, user._id];
        toast.success("Liked article!");
      }

      setArticle((prevArticle) => ({
        ...prevArticle,
        meta: {
          ...(prevArticle.meta || {}),
          // Cập nhật mảng ID để kích hoạt cập nhật trạng thái nút và số lượng.
          likes: newLikesArray,
        },
      }));


    } catch (error) {
      toast.error(error.message || "Error in like article.");
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>
  if (!article) return <div className="p-4">Article not found</div>

  // 🐛 SỬA LỖI: Sử dụng .some() và .toString() để kiểm tra trạng thái likedByUser chính xác
  const likedByUser = article.meta?.likes?.some(
    (id) => id.toString() === user?._id?.toString()
  )
  const likesCount = article.meta?.likes?.length || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-30">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-400 mb-4">By {article.author?.name}</p>

      {/* LIKE BUTTON */}
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center px-4 py-2 rounded-full font-semibold transition-colors 
            ${likedByUser
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            disabled:opacity-70`}
        >
          {isLiking ? '...' : (likedByUser ? 'Liked' : 'Like')}
        </button>
        <span className="text-sm text-gray-500">{likesCount} Likes</span>
      </div>

      <div
        className="prose max-w-none text-black px-5"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* COMMENT FORM */}
      <div className="mt-10 p-5 bg-gray-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leaves comment</h2>
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="4"
              placeholder="Comment here..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={commentLoading}
            />
            <button
              type="submit"
              disabled={commentLoading || !commentContent.trim()}
              className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {commentLoading ? 'Sending...' : 'Comment'}
            </button>
          </form>
        ) : (
          <p className="text-red-500">Please login to comment.</p>
        )}
      </div>

      {/* COMMENTS LIST */}
      <h2 className="text-xl mt-6">Comments ({comments.length})</h2>
      {commentLoading && <p>Loading comments...</p>}
      {comments.length === 0 && !commentLoading ? (
        <p>Chưa có bình luận nào</p>
      ) : (
        <div className="space-y-3 mt-3">
          {comments.map((c) => (
            <div key={c._id} className="p-3 bg-gray-800 rounded">
              <div className="text-sm text-green-300">{c.user?.name}</div>
              <div className="text-gray-300">{c.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}