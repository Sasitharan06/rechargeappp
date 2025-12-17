import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const planRewards = {
  'Unlimited 719': [
    { name: 'Airtel Xstream Play', icon: '🎬', validity: 'Included', desc: 'Premium movies & shows' },
    { name: 'Free Hellos', icon: '🎵', validity: 'Daily', desc: 'Set personalized ringtones' },
    { name: 'Data Rollover', icon: '🔄', validity: '30 days', desc: 'Carry unused data forward' },
  ],
  'OTT Combo 399': [
    { name: 'Disney+ Hotstar Mobile', icon: '📺', validity: '1 Month', desc: 'Movies, shows, sports' },
    { name: 'Free Hellos', icon: '🎵', validity: 'Daily', desc: 'Set personalized ringtones' },
    { name: 'Apollo 24/7', icon: '⚕️', validity: 'Included', desc: 'Health consultations' },
  ],
  'Annual 2999': [
    { name: 'Apollo 24/7', icon: '⚕️', validity: 'Included', desc: 'Health consultations' },
    { name: 'Wynk Premium', icon: '🎧', validity: '12 Months', desc: 'Music streaming' },
    { name: 'Airtel Cloud Storage', icon: '☁️', validity: 'Included', desc: '100GB backup' },
  ],
  'Student Saver 155': [
    { name: 'Airtel Xstream Lite', icon: '🎬', validity: 'Included', desc: 'Select shows & movies' },
    { name: 'Data Rollover', icon: '🔄', validity: '24 days', desc: 'Carry unused data forward' },
    { name: 'Student Benefits', icon: '🎓', validity: 'Included', desc: 'Exclusive discounts' },
  ],
}

export const PlanDetailsModal = ({ plan, onClose, isLoggedIn }) => {
  const [expandedSection, setExpandedSection] = useState(null)
  const navigate = useNavigate()
  const rewards = planRewards[plan.name] || []

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleRechargeClick = () => {
    if (!isLoggedIn) {
      alert('Please login or sign up to continue with recharge.')
      navigate('/login')
      onClose()
      return
    }
    
    // Navigate to payment page with plan details
    navigate('/payment', { state: { plan } })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header with Close Button */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold text-airtel-primary">₹{plan.price}</h2>
          <p className="text-gray-600 mt-1">{plan.name}</p>
        </div>

        {/* Plan Images/Benefits Visual */}
        <div className="px-6 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm font-bold text-gray-800">High Speed Data</p>
              <p className="text-xs text-gray-600 mt-1">{plan.validity}</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm font-bold text-gray-800">Premium Content</p>
              <p className="text-xs text-gray-600 mt-1">Included</p>
            </div>
          </div>

          {/* Plan Details Grid */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <span className="text-xl">☎️</span>
                <span className="font-semibold text-gray-700">Unlimited Calls</span>
              </div>
              <span className="text-airtel-primary font-bold">All networks</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <span className="font-semibold text-gray-700">Data Per Day</span>
              </div>
              <span className="text-airtel-primary font-bold">{plan.benefits[0] || '1.5 GB'}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <span className="text-xl">💬</span>
                <span className="font-semibold text-gray-700">SMS Per Day</span>
              </div>
              <span className="text-airtel-primary font-bold">100 SMS</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-semibold text-gray-700">Validity</span>
              </div>
              <span className="text-airtel-primary font-bold">{plan.validity}</span>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('rewards')}
            className="w-full flex items-center justify-between hover:opacity-70 transition"
          >
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>🎁</span> {rewards.length} MORE REWARDS
            </h3>
            <span className="text-2xl">{expandedSection === 'rewards' ? '▲' : '▼'}</span>
          </button>

          {expandedSection === 'rewards' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {rewards.map((reward, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                  <div className="text-3xl mb-2">{reward.icon}</div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{reward.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{reward.desc}</p>
                  <p className="text-xs font-semibold text-airtel-primary">Valid: {reward.validity}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('terms')}
            className="w-full flex items-center justify-between hover:opacity-70 transition"
          >
            <h3 className="text-sm font-bold text-gray-700 uppercase">Terms & Conditions</h3>
            <span className="text-2xl">{expandedSection === 'terms' ? '▲' : '▼'}</span>
          </button>

          {expandedSection === 'terms' && (
            <div className="mt-4 space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl">
              <p>✓ Plan validity starts from the date of recharge</p>
              <p>✓ Data rollover carries forward only within validity period</p>
              <p>✓ Unused data expires after plan validity ends</p>
              <p>✓ Free OTT benefits valid only on primary device</p>
              <p>✓ Calls valid only in India (roaming as per plan)</p>
              <p>✓ Non-transferable to other numbers</p>
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="px-6 py-6 bg-gradient-to-r from-airtel-primary/5 to-red-600/5 space-y-4">
          {plan.originalPrice && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Original Price</span>
              <span className="text-lg text-gray-400 line-through">₹{plan.originalPrice}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">You Pay</span>
            <span className="text-3xl font-bold text-airtel-primary">₹{plan.price}</span>
          </div>
          {plan.discount && (
            <div className="text-center bg-green-100 text-green-800 py-2 rounded-lg font-semibold text-sm">
              💚 Save ₹{Math.round(plan.originalPrice - plan.price)} with {plan.discount}
            </div>
          )}

          <button
            onClick={handleRechargeClick}
            className="w-full bg-gradient-to-r from-airtel-primary to-red-700 text-white font-bold py-4 rounded-xl hover:shadow-lg transition uppercase tracking-wide"
          >
            Recharge Now
          </button>
        </div>
      </div>
    </div>
  )
}
