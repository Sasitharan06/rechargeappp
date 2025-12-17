import { Link } from 'react-router-dom'

export const Sidebar = () => (
  <aside className="space-y-6">
    {/* Quick Links */}
    <div className="bg-white rounded-2xl shadow-soft p-4 space-y-3">
      <h3 className="font-bold text-airtel-dark">Quick Links</h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li className="flex items-center gap-2 cursor-pointer hover:text-airtel-primary transition">
          <span>💳</span> Wallet & Offers
        </li>
        <li>
          <Link to="/history" className="flex items-center gap-2 cursor-pointer hover:text-airtel-primary transition">
            <span>📋</span> Recharge History
          </Link>
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-airtel-primary transition">
          <span>❓</span> Help & Support
        </li>
      </ul>
    </div>

    {/* Current Offers */}
    <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-2xl shadow-soft p-4 border border-yellow-200">
      <h3 className="font-bold text-airtel-dark mb-3">🎉 Current Offers</h3>
      <ul className="text-xs text-gray-700 space-y-2">
        <li>✓ 20% Cashback on UPI</li>
        <li>✓ Free OTT with ₹499+</li>
        <li>✓ 50GB Extra Data</li>
        <li>✓ Rollover Benefits</li>
      </ul>
    </div>

    {/* Why Airtel */}
    <div className="bg-blue-50 rounded-2xl shadow-soft p-4 border border-blue-200">
      <h3 className="font-bold text-airtel-dark mb-3">Why Airtel?</h3>
      <ul className="text-xs text-gray-700 space-y-2">
        <li>⭐ Instant Activation</li>
        <li>🌐 5G Ready Plans</li>
        <li>🔒 Secure Payment</li>
        <li>💪 Best Coverage</li>
      </ul>
    </div>

    {/* Referral Banner */}
    <div className="bg-gradient-to-r from-airtel-primary to-red-700 rounded-2xl shadow-soft p-4 text-white text-center">
      <p className="font-bold mb-2">Refer & Earn</p>
      <p className="text-xs text-white/90 mb-3">Get ₹100 for each referral</p>
      <button className="w-full bg-white text-airtel-primary text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition">
        Refer Now
      </button>
    </div>

    {/* Mobile App Banner */}
    <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl shadow-soft p-4 border border-purple-200">
      <p className="text-sm font-bold text-airtel-dark mb-2">📱 Download App</p>
      <p className="text-xs text-gray-700 mb-3">Exclusive app-only offers</p>
      <div className="flex gap-2">
        <button className="flex-1 text-xs py-1.5 rounded-lg bg-gray-800 text-white hover:opacity-90">
          iOS
        </button>
        <button className="flex-1 text-xs py-1.5 rounded-lg bg-green-600 text-white hover:opacity-90">
          Android
        </button>
      </div>
    </div>
  </aside>
)
