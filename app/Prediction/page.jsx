"use client";
import React, { useState } from "react";
import { Users, TrendingUp, AlertTriangle, CheckCircle, Loader, ArrowRight, Shield, Target, Heart, Sparkles } from "lucide-react";

function PredictionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    Age: '',
    BusinessTravel: 'Travel_Rarely',
    DailyRate: '',
    Department: 'Sales',
    DistanceFromHome: '',
    Education: '3',
    EducationField: 'Life Sciences',
    EnvironmentSatisfaction: '3',
    Gender: 'Male',
    JobInvolvement: '3',
    JobLevel: '2',
    JobRole: 'Sales Executive',
    JobSatisfaction: '3',
    MaritalStatus: 'Single',
    MonthlyIncome: '',
    MonthlyRate: '',
    NumCompaniesWorked: '',
    OverTime: 'No',
    PercentSalaryHike: '',
    PerformanceRating: '3',
    RelationshipSatisfaction: '3',
    StockOptionLevel: '1',
    TotalWorkingYears: '',
    WorkLifeBalance: '3',
    YearsAtCompany: '',
    YearsInCurrentRole: '',
    YearsSinceLastPromotion: '',
    YearsWithCurrManager: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        ...formData,
        Age: parseInt(formData.Age),
        DailyRate: parseInt(formData.DailyRate),
        DistanceFromHome: parseInt(formData.DistanceFromHome),
        Education: parseInt(formData.Education),
        EnvironmentSatisfaction: parseInt(formData.EnvironmentSatisfaction),
        JobInvolvement: parseInt(formData.JobInvolvement),
        JobLevel: parseInt(formData.JobLevel),
        JobSatisfaction: parseInt(formData.JobSatisfaction),
        MonthlyIncome: parseInt(formData.MonthlyIncome),
        MonthlyRate: parseInt(formData.MonthlyRate),
        NumCompaniesWorked: parseInt(formData.NumCompaniesWorked),
        PercentSalaryHike: parseInt(formData.PercentSalaryHike),
        PerformanceRating: parseInt(formData.PerformanceRating),
        RelationshipSatisfaction: parseInt(formData.RelationshipSatisfaction),
        StockOptionLevel: parseInt(formData.StockOptionLevel),
        TotalWorkingYears: parseInt(formData.TotalWorkingYears),
        WorkLifeBalance: parseInt(formData.WorkLifeBalance),
        YearsAtCompany: parseInt(formData.YearsAtCompany),
        YearsInCurrentRole: parseInt(formData.YearsInCurrentRole),
        YearsSinceLastPromotion: parseInt(formData.YearsSinceLastPromotion),
        YearsWithCurrManager: parseInt(formData.YearsWithCurrManager)
      };

      const response = await fetch('/api/retention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.detail || 'Failed to generate prediction. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Employee Attrition Predictor</h1>
          <p className="text-blue-200 text-lg">AI-powered retention analysis and recommendations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Employee Information
              </h2>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Personal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder-gray-400"
                      placeholder="e.g., 30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
                    <select
                      name="MaritalStatus"
                      value={formData.MaritalStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Distance From Home *</label>
                    <input
                      type="number"
                      name="DistanceFromHome"
                      value={formData.DistanceFromHome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 placeholder-gray-400"
                      placeholder="km"
                    />
                  </div>
                </div>
              </div>

              {/* Education & Role */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                  Education & Role
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Education Level</label>
                    <select
                      name="Education"
                      value={formData.Education}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    >
                      <option value="1">Below College</option>
                      <option value="2">College</option>
                      <option value="3">Bachelor</option>
                      <option value="4">Master</option>
                      <option value="5">Doctor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Education Field</label>
                    <select
                      name="EducationField"
                      value={formData.EducationField}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="Life Sciences">Life Sciences</option>
                      <option value="Medical">Medical</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Technical Degree">Technical Degree</option>
                      <option value="Other">Other</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                      name="Department"
                      value={formData.Department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Research & Development">Research & Development</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Role</label>
                    <select
                      name="JobRole"
                      value={formData.JobRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="Sales Executive">Sales Executive</option>
                      <option value="Research Scientist">Research Scientist</option>
                      <option value="Laboratory Technician">Laboratory Technician</option>
                      <option value="Manufacturing Director">Manufacturing Director</option>
                      <option value="Healthcare Representative">Healthcare Representative</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales Representative">Sales Representative</option>
                      <option value="Research Director">Research Director</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Level</label>
                    <select
                      name="JobLevel"
                      value={formData.JobLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="1">Entry Level</option>
                      <option value="2">Mid Level</option>
                      <option value="3">Senior Level</option>
                      <option value="4">Lead Level</option>
                      <option value="5">Executive Level</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Compensation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income *</label>
                    <input
                      type="number"
                      name="MonthlyIncome"
                      value={formData.MonthlyIncome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-gray-900 placeholder-gray-400"
                      placeholder="$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rate *</label>
                    <input
                      type="number"
                      name="MonthlyRate"
                      value={formData.MonthlyRate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Daily Rate *</label>
                    <input
                      type="number"
                      name="DailyRate"
                      value={formData.DailyRate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Percent Salary Hike *</label>
                    <input
                      type="number"
                      name="PercentSalaryHike"
                      value={formData.PercentSalaryHike}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="%"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Option Level</label>
                    <select
                      name="StockOptionLevel"
                      value={formData.StockOptionLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    >
                      <option value="0">None</option>
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Work Experience
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Working Years *</label>
                    <input
                      type="number"
                      name="TotalWorkingYears"
                      value={formData.TotalWorkingYears}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-900 placeholder-gray-400"
                      placeholder="years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years At Company *</label>
                    <input
                      type="number"
                      name="YearsAtCompany"
                      value={formData.YearsAtCompany}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years In Current Role *</label>
                    <input
                      type="number"
                      name="YearsInCurrentRole"
                      value={formData.YearsInCurrentRole}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years Since Last Promotion *</label>
                    <input
                      type="number"
                      name="YearsSinceLastPromotion"
                      value={formData.YearsSinceLastPromotion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years With Current Manager *</label>
                    <input
                      type="number"
                      name="YearsWithCurrManager"
                      value={formData.YearsWithCurrManager}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Num Companies Worked *</label>
                    <input
                      type="number"
                      name="NumCompaniesWorked"
                      value={formData.NumCompaniesWorked}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="count"
                    />
                  </div>
                </div>
              </div>

              {/* Work Conditions & Satisfaction */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Work Conditions & Satisfaction
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Travel</label>
                    <select
                      name="BusinessTravel"
                      value={formData.BusinessTravel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-900"
                    >
                      <option value="Non-Travel">Non-Travel</option>
                      <option value="Travel_Rarely">Travel Rarely</option>
                      <option value="Travel_Frequently">Travel Frequently</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Over Time</label>
                    <select
                      name="OverTime"
                      value={formData.OverTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Environment Satisfaction</label>
                    <select
                      name="EnvironmentSatisfaction"
                      value={formData.EnvironmentSatisfaction}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                      <option value="4">Very High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Satisfaction</label>
                    <select
                      name="JobSatisfaction"
                      value={formData.JobSatisfaction}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                      <option value="4">Very High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Involvement</label>
                    <select
                      name="JobInvolvement"
                      value={formData.JobInvolvement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                      <option value="4">Very High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Work Life Balance</label>
                    <select
                      name="WorkLifeBalance"
                      value={formData.WorkLifeBalance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Bad</option>
                      <option value="2">Good</option>
                      <option value="3">Better</option>
                      <option value="4">Best</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship Satisfaction</label>
                    <select
                      name="RelationshipSatisfaction"
                      value={formData.RelationshipSatisfaction}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                      <option value="4">Very High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Performance Rating</label>
                    <select
                      name="PerformanceRating"
                      value={formData.PerformanceRating}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="1">Low</option>
                      <option value="2">Good</option>
                      <option value="3">Excellent</option>
                      <option value="4">Outstanding</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-start space-x-3 p-5 bg-red-50 border-l-4 border-red-500 rounded-2xl shadow-sm">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-6 h-6 mr-2 animate-spin" />
                    Analyzing Employee Data...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6 mr-2" />
                    Predict Attrition Risk
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Probability Card */}
                <div className={`rounded-3xl shadow-2xl p-8 ${
                  parseFloat(result.probability || result.churn_probability) > 50
                    ? 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-600'
                    : 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600'
                } text-white transform hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Attrition Risk Assessment</h3>
                    {parseFloat(result.probability || result.churn_probability) > 50 ? (
                      <AlertTriangle className="w-10 h-10" />
                    ) : (
                      <CheckCircle className="w-10 h-10" />
                    )}
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-7xl font-black mb-3 drop-shadow-lg">
                      {parseFloat(result.probability || result.churn_probability).toFixed(1)}%
                    </div>
                    <div className="text-xl font-medium opacity-95">
                      {parseFloat(result.probability || result.churn_probability) > 50
                        ? '⚠️ High Risk - Immediate Action Required'
                        : '✅ Low Risk - Employee Likely to Stay'}
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-2xl p-5 backdrop-blur-md border border-white/30">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">Risk Level:</span>
                      <span className="font-bold text-xl px-4 py-2 bg-white/25 rounded-xl">
                        {parseFloat(result.probability || result.churn_probability) > 75 ? '🔴 Critical' :
                         parseFloat(result.probability || result.churn_probability) > 50 ? '🟠 High' :
                         parseFloat(result.probability || result.churn_probability) > 25 ? '🟡 Moderate' : '🟢 Low'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Retention Strategies */}
                {parseFloat(result.probability || result.churn_probability) > 50 && result.retention_strategies && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Shield className="w-7 h-7 mr-3 text-blue-600" />
                      Retention Action Plan
                    </h3>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-5 mb-6 rounded-r-2xl">
                      <p className="text-base text-amber-900 font-semibold flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                        Immediate intervention recommended to prevent attrition
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      {typeof result.retention_strategies === 'string' ? (
                        <div className="whitespace-pre-wrap text-base">{result.retention_strategies}</div>
                      ) : Array.isArray(result.retention_strategies) ? (
                        <ul className="space-y-3">
                          {result.retention_strategies.map((strategy, idx) => (
                            <li key={idx} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                              <ArrowRight className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                              <span className="text-base">{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="whitespace-pre-wrap text-base">{JSON.stringify(result.retention_strategies, null, 2)}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Analysis Details */}
                {result.analysis && (
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Heart className="w-7 h-7 mr-3 text-pink-600" />
                      Detailed Analysis
                    </h3>
                    <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {result.analysis}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <TrendingUp className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Ready to Predict</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md mx-auto">
                  Fill out the employee information form to generate an attrition risk prediction and receive personalized retention strategies.
                </p>
                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-sm font-semibold text-gray-700">Employee Data</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <div className="text-sm font-semibold text-gray-700">AI Analysis</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-sm font-semibold text-gray-700">Action Plan</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionPage;