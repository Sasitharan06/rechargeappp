export const Footer = () => (
  <footer className="bg-airtel-dark text-gray-200 mt-12">
    <div className="container-page py-12 grid gap-8 md:grid-cols-4">
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>📱</span> Airtel Recharge
        </h3>
        <p className="text-sm text-gray-400">Fast, secure, and rewarding recharges for everyone. Join millions of happy customers.</p>
        <div className="flex gap-3 mt-4 text-xl">
          <a href="#" className="hover:opacity-80">👍</a>
          <a href="#" className="hover:opacity-80">🐦</a>
          <a href="#" className="hover:opacity-80">▶️</a>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-4">Navigation</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="/plans" className="hover:text-white transition">All Plans</a></li>
          <li><a href="/login" className="hover:text-white transition">Login</a></li>
          <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>📞 Call: 121 or <span className="text-yellow-200">9876543210</span></li>
          <li>📧 Email: <span className="text-yellow-200">support@airtelrecharge.com</span></li>
          <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-4">Legal</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Security</a></li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700"></div>

    {/* Bottom Section */}
    <div className="container-page py-6 grid gap-4 md:grid-cols-3 items-center text-sm text-gray-400">
      <div>
        <p>© 2025 Airtel Recharge. All rights reserved.</p>
      </div>
      <div className="text-center text-xs">
        <p>🔐 Secured by SSL | ✅ 100% Safe & Verified</p>
      </div>
      <div className="text-right">
        <p>Made with ❤️ for Airtel customers</p>
      </div>
    </div>
  </footer>
)
