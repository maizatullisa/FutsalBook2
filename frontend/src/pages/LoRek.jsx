/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight, FiUserPlus, FiPhone, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

// Base API URL
const API_URL = 'http://localhost:8000/api';

// Register function
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();
    return data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('Network error occurred');
  }
};

// Login function
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('Network error occurred');
  }  
};

const REGISTER_FIELDS = [
  { type: "text", placeholder: "Masukkan nama", icon: FiUser, name: "fullName", label: "Nama" },
  { type: "email", placeholder: "Masukkan Email", icon: FiMail, name: "email", label: "Email" },
  { type: "password", placeholder: "Buat Password", icon: FiLock, name: "password", label: "Password", hasToggle: true },
]

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({ email: "", password: "", fullName: ""})

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const result = await login(formData.email, formData.password) 
      
      if (!result.success) {
        // Handle errors dari backend
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(', ')
          setError(errorMessages)
        } else {
          setError(result.message || "Login gagal!")
        }
      } else {
        // Store user data and token
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setSuccess("Login berhasil! Mengarahkan ke dashboard...")
        // redirect ke dashboard instead of /home
      
        const role = result.user.role;

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/home");
          }
        }, 1500);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login!")
    }
    
    setIsLoading(false)
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError("")
    
    if (formData.email && formData.password && formData.fullName ) {
      try {
        const result = await register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        })
        
        if (!result.success) {
          // Handle validasi errors
          if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join(', ')
            setError(errorMessages)
          } else {
            setError(result.message || "Registrasi gagal!")
          }
        } else {
          setSuccess("Registrasi berhasil! Silakan login dengan akun Anda.")
          // Reset form danswitch ke login
          setTimeout(() => {
            setIsLogin(true)
            setFormData({ email: formData.email, password: "", fullName: ""})
            setSuccess("")
          }, 2000) 
        }
      } catch (err) {
        setError("Terjadi kesalahan saat registrasi!")
      }
    } else {
      setError("Mohon lengkapi semua field!")
    }
    
    setIsLoading(false)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setError("")
    setSuccess("")
    setFormData({ email: "", password: "", fullName: "" })
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-600/20 rounded-full blur-3xl transition-all duration-1000 ease-out ${isLogin ? 'scale-100 rotate-0' : 'scale-125 translate-x-32 -translate-y-16 rotate-45'}`} />
        <div className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl transition-all duration-1000 ease-out ${isLogin ? 'scale-100 rotate-0' : 'scale-125 -translate-x-32 translate-y-16 rotate-45'}`} />
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl transition-all duration-700 ${isLogin ? 'opacity-100 scale-100' : 'opacity-60 scale-150'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl transition-all duration-900 ${isLogin ? 'opacity-100 scale-100' : 'opacity-100 scale-125'}`} />
        <div className={`absolute top-20 left-20 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse`} />
        <div className={`absolute top-40 right-32 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce`} />
        <div className={`absolute bottom-32 left-40 w-3 h-3 bg-indigo-400/30 rounded-full animate-pulse`} />
        <div className={`absolute top-1/2 right-20 w-2 h-2 bg-pink-400/40 rounded-full animate-pulse`} />
      </div>

      {/*main container*/}
      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-purple-900/20 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-500/30">
        
        {/*sliding panel - Desktop*/}
        <div className={`hidden lg:flex absolute top-0 w-1/2 h-full z-20 transition-all duration-700 ease-in-out transform ${isLogin ? 'translate-x-full' : 'translate-x-0'} ${isLogin ? 'bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700' : 'bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700'} items-center justify-center text-white`}>
          <div className={`text-center px-8 transform transition-all duration-500`}>
            {isLogin ? (
              <div className="opacity-0 animate-fade-in">
                <FiUserPlus className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold mb-4">Belum Punya Akun?</h2>
                <p className="mb-6 text-purple-100 leading-relaxed">Silahkan melakukan registrasi dengan klik tombol di bawah ini</p>
                <button 
                  onClick={toggleMode} 
                  className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
                >
                  Mendaftar
                </button>
              </div>
            ) : (
              <div className="opacity-0 animate-fade-in">
                <FiUser className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-4">Selamat Datang</h2>
                <p className="mb-6 text-blue-100 leading-relaxed">Login untuk melanjutkan booking</p>
                <button 
                  onClick={toggleMode} 
                  className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/*Mobile Toggle Button*/}
        <div className="lg:hidden w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-4 flex justify-center items-center space-x-4 z-30">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isLogin ? 'bg-white text-purple-700 shadow-lg scale-105' : 'bg-transparent border-2 border-white/50 text-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${!isLogin ? 'bg-white text-blue-700 shadow-lg scale-105' : 'bg-transparent border-2 border-white/50 text-white'}`}
          >
            Daftar
          </button>
        </div>

        {/*Login Form*/}
        <div className={`w-full lg:w-1/2 p-6 lg:p-8 flex items-center justify-center transition-all duration-500 ${isLogin ? 'block' : 'hidden lg:block'} ${isLogin ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:-translate-x-8'}`}>
          <div className="w-full max-w-sm opacity-0 animate-fade-in-up">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Login</h3>
              <p className="text-gray-400">Selamat datang kembali di FutsalBook</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 rounded-lg flex items-center space-x-2 animate-slide-down">
                <FiAlertCircle className="text-red-400 animate-pulse flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-950/50 border border-green-500/30 rounded-lg flex items-center space-x-2 animate-slide-down">
                <FiCheckCircle className="text-green-400 animate-bounce flex-shrink-0" />
                <span className="text-green-300 text-sm">{success}</span>
              </div>
            )}

            <div className="space-y-4 lg:space-y-6">
              <div className="transform transition-all duration-300 hover:scale-105">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-hover:text-purple-400 transition-colors duration-200" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukkan Email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-500/50 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="transform transition-all duration-300 hover:scale-105">
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-hover:text-purple-400 transition-colors duration-200" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan Password"
                    className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-500/50 placeholder-gray-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer hover:text-purple-400 transition-colors duration-200">
                  <input type="checkbox" className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500 transition-all duration-200" />
                  <span className="ml-2 text-gray-400">Ingatkan Saya</span>
                </label>
                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-all duration-200 hover:scale-105">Lupa Password?</a>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all  duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/*Register Form*/}
        <div className={`w-full lg:w-1/2 p-6 lg:p-8 flex items-center justify-center transition-all duration-500 ${!isLogin ? 'block' : 'hidden lg:block'} ${!isLogin ? 'opacity-100 translate-x-0' : 'lg:opacity-0 lg:translate-x-8'}`}>
          <div className="w-full max-w-sm opacity-0 animate-fade-in-up">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Mendaftar</h3>
              <p className="text-gray-400">Buat Akun FutsalBook Anda</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 rounded-lg flex items-center space-x-2 animate-slide-down">
                <FiAlertCircle className="text-red-400 animate-pulse flex-shrink-0" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-950/50 border border-green-500/30 rounded-lg flex items-center space-x-2 animate-slide-down">
                <FiCheckCircle className="text-green-400 animate-bounce flex-shrink-0" />
                <span className="text-green-300 text-sm">{success}</span>
              </div>
            )}

            <div className="space-y-3 lg:space-y-4">
              {REGISTER_FIELDS.map((field, index) => (
                <div key={field.name} className="transform transition-all duration-300 hover:scale-105" style={{ animationDelay: `${index * 100}ms` }}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{field.label}</label>
                  <div className="relative group">
                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-hover:text-blue-400 transition-colors duration-200" />
                    <input
                      type={field.hasToggle ? (showPassword ? "text" : "password") : field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50 placeholder-gray-500"
                    />
                    {field.hasToggle && (
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-all duration-200 hover:scale-110"
                      >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all  duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Buat Akun</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
