import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import config from '../config';

const PaymentPage = () => {
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [processing, setProcessing] = useState(false)

  // Get plan from navigation state or use default
  const selectedPlan = location.state?.plan || {
    name: 'Unlimited 719',
    price: 719,
    validity: '84 days',
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-airtel-light">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-airtel-dark mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to proceed with payment.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 rounded-xl bg-airtel-primary text-white font-semibold hover:bg-red-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }
    setProcessing(true)

    try {
      // Create recharge in backend
      const rechargeData = {
        userId: user._id,
        mobileNumber: user.phone || '9999999999', // Fallback if missing, but should be there
        operator: 'AIRTEL',
        planAmount: selectedPlan.price,
        status: 'SUCCESS'
      };

      const response = await fetch(`${config.API_URL}/recharges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rechargeData)
      });

      if (!response.ok) {
        throw new Error('Recharge failed');
      }

      const transactionId = 'TXN' + Date.now()

      setTimeout(() => {
        // Navigate to invoice page with payment details
        navigate('/invoice', {
          state: {
            plan: selectedPlan,
            paymentMethod,
            transactionId,
          },
        })
      }, 2000)

    } catch (error) {
      console.error("Payment Error:", error)
      alert('Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  const paymentOptions = [
    { id: 'card', label: '💳 Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
    { id: 'upi', label: '📱 UPI', desc: 'PhonePe, Google Pay, Paytm' },
    { id: 'wallet', label: '💰 Digital Wallet', desc: 'Airtel Pay, Paytm Wallet' },
    { id: 'netbanking', label: '🏦 Net Banking', desc: 'All major Indian banks' },
  ]

  return (
    <div className="bg-airtel-light min-h-screen py-10">
      <div className="container-page max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-airtel-primary to-red-700 text-white rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-white/90">Secure and quick payment processing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Plan Details */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-airtel-dark mb-4">Plan Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Plan Name</span>
                  <span className="font-bold text-airtel-dark">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-bold text-airtel-dark">{selectedPlan.validity}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Benefits</span>
                  <span className="font-bold text-airtel-dark">✓ Calls, Data, SMS included</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                  <span className="text-3xl font-bold text-airtel-primary">₹{selectedPlan.price}</span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-airtel-dark mb-4">Billing Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-airtel-dark">{user?.name || 'User'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-airtel-dark">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-airtel-dark mb-4">Select Payment Method</h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition ${paymentMethod === option.id
                      ? 'border-airtel-primary bg-airtel-light'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === option.id}
                        onChange={() => setPaymentMethod(option.id)}
                        className="w-4 h-4 accent-airtel-primary"
                      />
                      <div>
                        <p className="font-semibold text-airtel-dark">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Breakdown & CTA */}
          <div>
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-20 space-y-4">
              <h3 className="text-lg font-bold text-airtel-dark">Price Breakdown</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Plan Amount</span>
                  <span>₹{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Charges</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                  <span className="font-semibold">Cashback</span>
                  <span className="font-bold">-₹{Math.round(selectedPlan.price * 0.1)}</span>
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-700">You Pay</span>
                <span className="text-3xl font-bold text-airtel-primary">₹{Math.round(selectedPlan.price * 0.9)}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing || !paymentMethod}
                className={`w-full py-3 rounded-xl font-bold text-white transition ${processing || !paymentMethod
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-airtel-primary to-red-700 hover:shadow-lg'
                  }`}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>🔒 Secure payment gateway</p>
                <p>SSL Encrypted transaction</p>
              </div>

              {/* Secure Badges */}
              <div className="flex justify-center gap-2 text-2xl">
                <span title="SSL Secure">🔐</span>
                <span title="RBI Verified">✅</span>
                <span title="Money Back">💯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-4 border border-blue-200 text-center text-sm text-blue-900">
          <p>💡 <strong>Tip:</strong> Use UPI or Debit Card for fastest processing and instant cashback.</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
