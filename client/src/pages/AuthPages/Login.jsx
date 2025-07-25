import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { API, handleApi } from "../../services/api.js";
import { loginUser, loginWithGoogle } from "../../firebase/firebase.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };
    if (!value.trim()) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try{
      const { email, password } = formData;
      let firebaseRes = await loginUser(email, password);

      let res = await handleApi(API.post('/auth', { firebaseToken: firebaseRes.accessToken }));

      if(res.status === 200){

        const { token, user } = res.data;
        auth.loginContext(user, token);
        toast.success(res.data.message);
        setLoading(false);
        setFormData({ email: "", password: "" });
        navigate("/");
      }

    }catch(err){
      let msg = err.message;
      const match = msg.match(/auth\/(\w+-\w+)/);
      if (match) {
        msg = match[1].replace(/-/g, " ");
      }
      toast.error(msg.charAt(0).toUpperCase() + msg.slice(1));
      setLoading(false);
    }
  };

  const googleLoginHandler = async (e)=> {
    e.preventDefault();
    setLoading(true);
        try{
          let firebaseRes = await loginWithGoogle();

          let res = await handleApi(API.post('/auth', {name, firebaseToken: firebaseRes.accessToken}));
      
          if(res.status === 200){
            const { token, user } = res.data;
            auth.loginContext(user, token);   
            toast.success(res.data.message);
            setLoading(false);
            setFormData({ name: '', email: '', password: '' });
            navigate('/');
            setLoading(false);
          }
        } catch(err){

          let msg = err.message;
          const match = msg.match(/\(auth\/([^)]+)\)/);
          if (match && match[1]) {
            msg = match[1].replace(/-/g, " ");
          }

          toast.error(msg.charAt(0).toUpperCase() + msg.slice(1));
          setLoading(false);
        }     
  }

  return (

    <div className="h-fit mt-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative flex justify-center items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}

            <span className='absolute right-3'>
              {
                !showPassword ? (
                  <Eye className='hover:cursor-pointer' onClick={() => setShowPassword(true)} />
                ) : (
                  <EyeClosed className="hover:cursor-pointer" onClick={() => setShowPassword(false)} />
                )
              }
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:cursor-pointer text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
             { loading ? (
                <LoaderCircle className="animate-spin text-white" />
              ) : (
                'Login'
              )
             }
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="px-3 text-sm"> OR </span>
          <hr className="flex-grow" />
        </div>

        <div>
          <button className="w-full bg-white border border-gray-300 hover:bg-gray-600 hover:text-white hover:cursor-pointer text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            onClick={googleLoginHandler}
          >
            <span><i className="fa-brands fa-google"></i></span>
            Continue with Google
          </button>
        </div>

        <Link to="/reset-password" className="block text-center text-sm underline text-blue-00 hover:text-blue-700 mt-4 transition-colors">
          Forget password? click here
        </Link>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}