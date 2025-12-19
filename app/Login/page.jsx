'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Mail, Lock, AlertCircle, CheckCircle, Sparkles, Layers, Shield } from "lucide-react";

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const router=useRouter()


  async function handleSubmit() {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        router.push('/Prediction')
      } else {
        // Handle validation errors from FastAPI
        if (data.detail) {
          if (Array.isArray(data.detail)) {
            // FastAPI validation errors
            const errorMessages = data.detail.map(err => err.msg).join(', ');
            setError(errorMessages);
          } else if (typeof data.detail === 'string') {
            setError(data.detail);
          } else {
            setError('Login failed. Please try again.');
          }
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10">
        
        {/* Left Section - Branding */}
        <div className="lg:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
          {/* Abstract pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            {/* Logo */}
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <FileText className="w-10 h-10 text-emerald-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">ArticleAI</h1>
            <p className="text-lg text-emerald-50 mb-8">Transform your content with intelligent AI analysis</p>

            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                <Sparkles className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm">AI-powered insights</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                <Layers className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm">Multi-layer analysis</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                <Shield className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm">Secure & private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-3/5 p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            <div className="space-y-5">
              {/* Email or Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Username</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 hover:bg-white"
                    placeholder="Enter your email or username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-800 bg-gray-50 hover:bg-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="flex items-center space-x-3 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-emerald-700">{message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Sign up link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/SignUp" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    Create account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;