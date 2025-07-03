export default function Footer() {
  return (
    <footer className="bg-white/80 border-t border-gray-100 py-4 text-center text-sm text-gray-500 font-sans mt-8 rounded-t-2xl shadow-inner">
      © {new Date().getFullYear()} MyReactApp. All rights reserved.
    </footer>
  );
}
