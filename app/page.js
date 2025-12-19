"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Target, 
  Brain,
  BarChart3,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Lock,
  Zap,
  Award,
  Globe,
  LogOut,
  UserCircle
} from "lucide-react";

function MainPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verifyToken', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Token verification error:', err);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        router.push('/Login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navigateToPrediction = () => {
    router.push('/prediction');
  };

  const navigateToLogin = () => {
    router.push('/Login');
  };

  const navigateToSignup = () => {
    router.push('/SignUp');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">AttritionAI</span>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={navigateToPrediction}
                    className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    <Target className="w-5 h-5" />
                    <span>Predict</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={navigateToLogin}
                    className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={navigateToSignup}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-blue-200 text-sm font-semibold">AI-Powered Retention Analytics</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Predict Employee
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Attrition Risk
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Leverage advanced AI to identify at-risk employees and receive personalized retention strategies. 
              Make data-driven decisions to keep your best talent.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {isAuthenticated ? (
                <button
                  onClick={navigateToPrediction}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3"
                >
                  <span>Start Predicting</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <>
                  <button
                    onClick={navigateToSignup}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-3"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={navigateToLogin}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">95%</div>
              <div className="text-blue-200 font-semibold">Prediction Accuracy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">30%</div>
              <div className="text-blue-200 font-semibold">Reduction in Turnover</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">10K+</div>
              <div className="text-blue-200 font-semibold">Predictions Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-blue-200">
              Everything you need to retain your top talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-blue-100 leading-relaxed">
                Advanced machine learning algorithms analyze 30+ factors to predict employee attrition with exceptional accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Retention Strategies</h3>
              <p className="text-blue-100 leading-relaxed">
                Get personalized, actionable recommendations to prevent employee turnover and boost engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-Time Insights</h3>
              <p className="text-blue-100 leading-relaxed">
                Instant risk assessment with detailed analysis of key factors affecting employee retention.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Quick Results</h3>
              <p className="text-blue-100 leading-relaxed">
                Get comprehensive predictions in seconds, not hours. Make fast, informed decisions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Secure & Private</h3>
              <p className="text-blue-100 leading-relaxed">
                Your employee data is encrypted and protected with enterprise-grade security measures.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Proven Results</h3>
              <p className="text-blue-100 leading-relaxed">
                Join organizations that have reduced turnover by 30% using our AI-powered platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-200">
              Three simple steps to predict and prevent employee attrition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Input Employee Data</h3>
                <p className="text-blue-100 leading-relaxed">
                  Enter employee information including demographics, job details, and satisfaction metrics.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Analysis</h3>
                <p className="text-blue-100 leading-relaxed">
                  Our machine learning model analyzes the data and calculates attrition risk probability.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-indigo-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Take Action</h3>
                <p className="text-blue-100 leading-relaxed">
                  Receive personalized retention strategies and implement them to keep your talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Reduce Employee Turnover?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of HR professionals using AI to make smarter retention decisions.
          </p>
          
          {isAuthenticated ? (
            <button
              onClick={navigateToPrediction}
              className="group px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <span>Start Predicting Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={navigateToSignup}
                className="group px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Sign Up Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={navigateToLogin}
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">AttritionAI</span>
            </div>
            
            <div className="text-blue-200 text-sm">
              © 2024 AttritionAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;