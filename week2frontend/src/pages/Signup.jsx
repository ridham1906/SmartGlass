import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const newErrors = { ...errors };
    if (!value) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(form).some((v) => v.trim() === '');
    if (hasErrors) {
      const newErrors = {};
      Object.entries(form).forEach(([key, val]) => {
        if (!val) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      });
      setErrors(newErrors);
      return;
    }
    console.log('Signup Successful:', form);
    toast.success('Signup successful! Redirecting to login...', { position: 'top-right' });
    setTimeout(() => window.location.href = '/login', 2000);
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col justify-center items-center p-6">
      <img
        src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt="Welcome"
        className="rounded-full w-48 h-48 object-cover mb-4 shadow-lg"
      />
      <h1 className="text-4xl font-bold text-indigo-700 mb-4 text-center">Join SmartGlass</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Empowering Indian classrooms with interactive discussions and smart presentations.
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md animate-fade-in">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300"
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 underline hover:text-indigo-800">
            Login
          </a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}