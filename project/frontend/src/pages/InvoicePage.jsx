import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const InvoicePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Get payment details from navigation state
  const paymentData = location.state || {}
  const { plan, paymentMethod, transactionId } = paymentData

  // If no payment data, redirect to plans
  if (!plan) {
    setTimeout(() => navigate('/plans'), 100)
    return (
      <div className="min-h-screen flex items-center justify-center bg-airtel-light">
        <p className="text-gray-600">No invoice data available. Redirecting...</p>
      </div>
    )
  }

  const invoiceDate = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert('Invoice download feature coming soon!')
  }

  return (
    <div className="bg-airtel-light min-h-screen py-10">
      <div className="container-page max-w-3xl">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-white/90">Your recharge has been completed successfully</p>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-airtel-primary to-red-700 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">INVOICE / RECEIPT</h2>
                <p className="text-white/80 text-sm">Transaction Successful</p>
              </div>
              <div className="text-4xl">📱</div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-8 space-y-6">
            {/* Transaction Details */}
            <div className="grid md:grid-cols-2 gap-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                <p className="text-lg font-bold text-airtel-dark">{transactionId || 'TXN' + Date.now()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-bold text-airtel-dark">{invoiceDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="text-lg font-bold text-airtel-dark capitalize">{paymentMethod || 'UPI'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-bold">
                  ✓ Completed
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="pb-6 border-b">
              <h3 className="text-lg font-bold text-airtel-dark mb-4">Customer Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-airtel-dark">{user?.name || 'Customer'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-airtel-dark">{user?.email || 'customer@example.com'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-semibold text-airtel-dark">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Operator</p>
                  <p className="font-semibold text-airtel-dark">Airtel Prepaid</p>
                </div>
              </div>
            </div>

            {/* Plan Details */}
            <div className="pb-6 border-b">
              <h3 className="text-lg font-bold text-airtel-dark mb-4">Recharge Plan Details</h3>
              <div className="bg-airtel-light rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Plan Name</span>
                  <span className="font-bold text-airtel-dark">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Validity</span>
                  <span className="font-bold text-airtel-dark">{plan.validity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Data</span>
                  <span className="font-bold text-airtel-dark">{plan.benefits?.[0] || 'As per plan'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Voice</span>
                  <span className="font-bold text-airtel-dark">Unlimited Calls</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">SMS</span>
                  <span className="font-bold text-airtel-dark">100/day</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h3 className="text-lg font-bold text-airtel-dark mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Plan Amount</span>
                  <span>₹{plan.price}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex justify-between text-gray-700">
                    <span>Discount ({plan.discount})</span>
                    <span className="text-green-600">-₹{plan.originalPrice - plan.price}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(plan.price * 0.18)}</span>
                </div>
                <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-lg">
                  <span className="font-semibold">Cashback Applied</span>
                  <span className="font-bold">-₹{Math.round(plan.price * 0.1)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-airtel-primary">
                  <span className="text-xl font-bold text-gray-800">Total Paid</span>
                  <span className="text-3xl font-bold text-airtel-primary">₹{Math.round(plan.price * 1.08)}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-bold text-airtel-dark mb-3 flex items-center gap-2">
                <span>🎁</span> Your Benefits
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 p-6 flex flex-wrap gap-3 justify-center border-t">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              🖨️ Print Invoice
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              📥 Download PDF
            </button>
            <Link
              to="/history"
              className="px-6 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition flex items-center gap-2"
            >
              📜 View History
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-airtel-primary to-red-700 text-white font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>

        {/* Support Message */}
        <div className="mt-8 bg-white rounded-2xl p-6 text-center shadow-soft">
          <p className="text-gray-600 mb-2">Need help? Contact us</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="tel:121" className="text-airtel-primary font-semibold hover:underline">
              📞 Call 121
            </a>
            <a href="mailto:support@airtel.in" className="text-airtel-primary font-semibold hover:underline">
              📧 Email Support
            </a>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Thank you for choosing Airtel! 🎉</p>
          <p className="mt-1">Your recharge will be activated within 5 minutes.</p>
        </div>
      </div>
    </div>
  )
}

export default InvoicePage
