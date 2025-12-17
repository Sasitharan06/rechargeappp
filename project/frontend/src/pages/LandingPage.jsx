import { Link } from 'react-router-dom'

const banners = [
  {
    id: 1,
    title: 'Get 50GB Extra Data',
    subtitle: 'Recharge with plans above ₹499',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    title: '20% Cashback',
    subtitle: 'On all recharges above ₹299',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    id: 3,
    title: 'Disney+ Hotstar Free',
    subtitle: 'With selected prepaid plans',
    gradient: 'from-pink-500 to-red-600',
  },
]

const offers = [
  { label: '5G Ready', icon: '📡' },
  { label: 'Unlimited Calls', icon: '☎️' },
  { label: 'High Speed Data', icon: '⚡' },
  { label: 'Rollover Data', icon: '🔄' },
]

const LandingPage = () => (
  <div className="bg-white">
    {/* Animated Banner with Playlist Image */}
    <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container-page py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 animate-slide-in-left">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              🎵 Get Free Music Streaming
            </h2>
            <p className="text-xl text-white/90">
              Enjoy unlimited songs with Wynk Music & Apple Music on selected plans
            </p>
            <Link
              to="/plans"
              className="inline-block px-8 py-4 rounded-xl bg-white text-purple-600 font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              Explore Plans
            </Link>
          </div>
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="/playlist.png"
              alt="Music Playlist"
              className="relative w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80'
              }}
            />
          </div>
        </div>
      </div>
      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    {/* Hero Banner */}
    <section className="bg-gradient-to-r from-airtel-primary to-red-700 text-white py-12">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
              🎉 Airtel Special Offers
            </span>
            <h1 className="text-5xl font-extrabold leading-tight">
              Recharge faster. Earn rewards. Stay connected.
            </h1>
            <p className="text-lg text-white/90 max-w-xl">
              Discover exclusive prepaid plans with cashback, free OTT subscriptions, and lightning-fast 5G data.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/plans"
                className="px-6 py-3 rounded-xl bg-white text-airtel-primary font-semibold shadow-lg hover:-translate-y-1 transition"
              >
                View Plans Now
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
              <div className="space-y-3">
                {banners.slice(0, 2).map((b) => (
                  <div key={b.id} className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20">
                    <p className="text-sm font-semibold text-white/70">{b.title}</p>
                    <p className="text-lg font-bold text-white">{b.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Promotional Banners */}
    <section className="container-page py-10">
      <h2 className="text-3xl font-bold text-airtel-dark mb-6">Special Offers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`relative h-48 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition cursor-pointer group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient}`}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
              <p className="text-sm text-white/90 mb-3">{banner.subtitle}</p>
              <Link to="/plans" className="text-sm font-semibold underline hover:no-underline">
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Key Features */}
    <section className="bg-airtel-light py-10">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-airtel-dark mb-8">Why Choose Airtel?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div key={offer.label} className="bg-white rounded-3xl shadow-soft p-6 text-center hover:-translate-y-2 transition">
              <div className="text-4xl mb-3">{offer.icon}</div>
              <p className="text-lg font-semibold text-airtel-dark">{offer.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="container-page py-12">
      <h2 className="text-3xl font-bold text-airtel-dark mb-8">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { num: '1', title: 'Select Number', desc: 'Enter your Airtel number' },
          { num: '2', title: 'Choose Plan', desc: 'Pick from amazing offers' },
          { num: '3', title: 'Pay Securely', desc: 'Multiple payment options' },
          { num: '4', title: 'Instant Recharge', desc: 'Activated immediately' },
        ].map((step) => (
          <div key={step.num} className="relative">
            <div className="bg-gradient-to-br from-airtel-primary to-red-700 text-white rounded-3xl p-6 min-h-48 flex flex-col justify-between">
              <div className="text-5xl font-bold opacity-20">{step.num}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/90">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-white py-12">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-airtel-dark mb-8 text-center">Trusted by Millions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Rajesh K.', text: 'Fastest recharge platform! Instant activation.' },
            { name: 'Priya M.', text: 'Great plans and excellent cashback offers.' },
            { name: 'Amit S.', text: 'Best Airtel recharge site with 5G support.' },
          ].map((review) => (
            <div key={review.name} className="bg-airtel-light rounded-2xl p-6 border-l-4 border-airtel-primary shadow-soft">
              <div className="text-yellow-500 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-4">"{review.text}"</p>
              <p className="font-semibold text-airtel-dark">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Dashboard Preview */}
    <section className="bg-gradient-to-b from-airtel-light to-white py-12">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-airtel-dark">Your Personal Dashboard</h2>
          <ul className="space-y-3 text-gray-700">
            {['📊 Track all your recharges', '💰 View cashback & rewards', '🎁 Access exclusive offers', '📱 Multi-number support'].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-lg">
                  {item}
                </li>
              ),
            )}
          </ul>
          <Link
            to="/login"
            className="inline-block px-6 py-3 rounded-xl bg-airtel-primary text-white font-semibold hover:bg-red-700 transition shadow-lg"
          >
            Login to Dashboard
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="text-gray-600">Active Plan</span>
              <span className="font-bold text-airtel-primary">₹719</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Data', value: '1.5 GB/day' },
                { label: 'Voice', value: 'Unlimited' },
                { label: 'SMS', value: '100/day' },
                { label: 'Validity', value: '84 days' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-airtel-light text-center">
                  <p className="text-xs text-gray-600">{item.label}</p>
                  <p className="text-sm font-bold text-airtel-dark">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="bg-gradient-to-r from-airtel-primary to-red-700 py-12 text-white">
      <div className="container-page text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Recharge?</h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Join millions of happy customers and enjoy seamless recharges with exclusive benefits and rewards.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/plans"
            className="px-8 py-3 rounded-xl bg-white text-airtel-primary font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Browse Plans
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 rounded-xl border-2 border-white font-bold hover:bg-white/10 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default LandingPage
