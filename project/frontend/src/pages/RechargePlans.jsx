import { useMemo, useState, useEffect } from 'react'
import { PlanCard } from '../components/PlanCard.jsx'
import { PlanDetailsModal } from '../components/PlanDetailsModal.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import config from '../config';

const categories = ['All', 'Unlimited', 'Data Add-on', 'Budget', 'Unlimited + OTT']

const RechargePlans = () => {
  const { isLoggedIn } = useAuth()
  const [plansData, setPlansData] = useState([])
  const [category, setCategory] = useState('All')
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${config.API_URL}/plans/AIRTEL`);
        const data = await response.json();
        setPlansData(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const filtered = useMemo(() => (
    category === 'All'
      ? plansData
      : plansData.filter((p) => p.type.toLowerCase().includes(category.toLowerCase()))
  ), [category, plansData])

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  return (
    <div className="bg-airtel-light min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-airtel-primary to-red-700 text-white py-8">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-2">Recharge Plans</h1>
          <p className="text-white/90">Find the perfect plan for your needs. All plans include 5G support.</p>
        </div>
      </section>

      {/* Discount Banners */}
      <section className="container-page py-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-semibold text-white/80 mb-1">🎉 Limited Time Offer</p>
            <h3 className="text-2xl font-bold mb-2">20% Extra Data</h3>
            <p className="text-sm text-white/90">On all plans above ₹299</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-semibold text-white/80 mb-1">💳 Cashback Available</p>
            <h3 className="text-2xl font-bold mb-2">Get ₹100 Back</h3>
            <p className="text-sm text-white/90">With UPI & Debit Card payments</p>
          </div>
        </div>
      </section>

      <div className="container-page py-8 grid gap-8 lg:grid-cols-[3fr_1fr] items-start">
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-2xl shadow-soft">
            <div>
              <p className="text-sm text-gray-600">Choose a plan that fits you</p>
              <h2 className="text-2xl font-bold text-airtel-dark">All Plans</h2>
            </div>
            <div className="flex gap-2 bg-airtel-light p-1 rounded-xl flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${category === cat
                    ? 'bg-airtel-primary text-white'
                    : 'text-airtel-dark hover:bg-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((plan) => (
              <div key={plan._id || plan.name} onClick={() => handleSelectPlan(plan)} className="cursor-pointer">
                <PlanCard plan={plan} onSelect={() => handleSelectPlan(plan)} />
              </div>
            ))}
          </div>

          {/* Modal for Plan Details */}
          {selectedPlan && (
            <PlanDetailsModal
              plan={selectedPlan}
              onClose={() => setSelectedPlan(null)}
              isLoggedIn={isLoggedIn}
            />
          )}

          {/* CTA to Payment */}
          {isLoggedIn && (
            <div className="bg-gradient-to-r from-airtel-primary to-red-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to recharge?</h3>
              <Link
                to="/payment"
                className="inline-block px-6 py-3 rounded-xl bg-white text-airtel-primary font-bold hover:bg-gray-100 transition"
              >
                Go to Payment
              </Link>
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  )
}

export default RechargePlans
