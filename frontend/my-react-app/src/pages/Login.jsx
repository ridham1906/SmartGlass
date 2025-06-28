export default function Login() {
 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
 <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-100">
 <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
 Login
 </h2>
 
 <form className="space-y-5">
 <div>
 <input
 type="email"
 placeholder="Email"
 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
 />
 </div>
 <div>
 <input
 type="password"
 placeholder="Password"
 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
 />
 </div>
 <button
 type="submit"
 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
 >
 Login
 </button>
 </form>
 
 <p className="text-center text-gray-600 mt-6 text-sm">
 Don't have an account?{' '}
 <a 
 href="/signup" 
 className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
 >
 Sign up
 </a>
 </p>
 </div>
 </div>
 );
}
