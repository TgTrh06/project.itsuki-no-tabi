import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, Loader } from "lucide-react"
import { motion } from "framer-motion"
import useAuthStore from "../../store/authStore"
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter"

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { signup, error, isLoading } = useAuthStore()

  useEffect(() => {
    if (error) {
      // Reset error after changing input
      setTimeout(() => {
        useAuthStore.setState({ error: null })
      }, 3000)
    }
  }, [name, email, password])

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await signup(name, email, password)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-br from-secondary via-background to-accent/20 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">Create Account</h1>
          <p className="text-muted-foreground">Join Itsuki no Tabi today</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-border"
        >
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    useAuthStore.setState({ error: null })
                  }}
                  placeholder="Itsuki Desu"
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    useAuthStore.setState({ error: null })
                  }}
                  placeholder="itsuki@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    useAuthStore.setState({ error: null })
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Strength */}
            <PasswordStrengthMeter password={password} />

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <p className="text-sm text-destructive font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:opacity-80 font-semibold transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
