import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import config from '../config';

const HistoryPage = () => {
    const { user, isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const [recharges, setRecharges] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }

        const fetchHistory = async () => {
            try {
                const response = await fetch(`${config.API_URL}/recharges?userId=${user._id}`)
                const data = await response.json()
                setRecharges(data)
            } catch (error) {
                console.error("Error fetching history:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [isLoggedIn, navigate, user])

    return (
        <div className="bg-airtel-light min-h-screen">
            <section className="bg-gradient-to-r from-airtel-primary to-red-700 text-white py-8">
                <div className="container-page">
                    <h1 className="text-4xl font-bold mb-2">Recharge History</h1>
                    <p className="text-white/90">View all your past transactions and recharges.</p>
                </div>
            </section>

            <div className="container-page py-8 grid gap-8 lg:grid-cols-[3fr_1fr] items-start">
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600">Loading history...</p>
                        </div>
                    ) : recharges.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-soft p-10 text-center">
                            <div className="text-6xl mb-4">📜</div>
                            <h2 className="text-2xl font-bold text-airtel-dark mb-2">No history found</h2>
                            <p className="text-gray-600 mb-6">You haven't made any recharges yet.</p>
                            <Link
                                to="/plans"
                                className="px-6 py-3 rounded-xl bg-airtel-primary text-white font-semibold hover:bg-red-700 transition"
                            >
                                Recharge Now
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="p-4 font-semibold text-gray-600">Date</th>
                                            <th className="p-4 font-semibold text-gray-600">Number</th>
                                            <th className="p-4 font-semibold text-gray-600">Operator</th>
                                            <th className="p-4 font-semibold text-gray-600">Amount</th>
                                            <th className="p-4 font-semibold text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recharges.map((recharge) => (
                                            <tr key={recharge._id} className="hover:bg-gray-50 transition">
                                                <td className="p-4 text-gray-700">
                                                    {new Date(recharge.createdAt).toLocaleDateString("en-IN", {
                                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="p-4 font-medium text-airtel-dark">{recharge.mobileNumber}</td>
                                                <td className="p-4 text-gray-700">{recharge.operator}</td>
                                                <td className="p-4 font-bold text-airtel-dark">₹{recharge.planAmount}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${recharge.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                                                        recharge.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {recharge.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                <Sidebar />
            </div>
        </div>
    )
}

export default HistoryPage
