export const PlanCard = ({ plan, onSelect }) => (
  <div
    onClick={() => onSelect(plan)}
    className="bg-white rounded-2xl shadow-soft p-5 flex flex-col gap-3 border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group"
  >
    {/* Discount Badge */}
    {plan.discount && (
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold">
          {plan.discount}
        </span>
      </div>
    )}

    {/* Plan Type Badge */}
    {plan.badge && (
      <span className="self-start text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full z-10">
        {plan.badge}
      </span>
    )}

    {/* Popular Badge */}
    {plan.popular && !plan.badge && (
      <span className="self-start text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full z-10">
        Popular
      </span>
    )}

    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-airtel-dark">{plan.name}</h3>
        <p className="text-sm text-gray-500">{plan.validity} validity</p>
      </div>
    </div>

    {/* Pricing */}
    <div className="border-t border-b py-3">
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-airtel-primary">₹{plan.price}</p>
        {plan.originalPrice && (
          <p className="text-lg text-gray-400 line-through">₹{plan.originalPrice}</p>
        )}
      </div>
      <p className="text-xs text-gray-500">{plan.type}</p>
    </div>

    {/* Benefits */}
    <ul className="text-sm text-gray-600 space-y-1">
      {plan.benefits?.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="text-airtel-primary">✓</span> {item}
        </li>
      ))}
    </ul>

    {/* View Details Button */}
    <button
      onClick={(e) => {
        e.stopPropagation()
        onSelect(plan)
      }}
      className="mt-auto w-full bg-gradient-to-r from-airtel-primary to-red-700 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition active:scale-95"
    >
      View Details
    </button>
  </div>
)
