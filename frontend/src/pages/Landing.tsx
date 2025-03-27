import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <span className="text-blue-500">UC</span>ASH
          </div>

          {/* Links and CTA */}
          <div className="flex items-center space-x-8">
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </a>
            <a href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </a>
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start for free
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Left Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold sm:text-6xl">
              Save and monitor your Finance with us.
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              We believe that when you save smarter, you live better. Our platform is designed to help you build strong financial habits that lead to long-term stability and success.
            </p>
            <button
              className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/register')}
            >
              Register Now
            </button>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 lg:ml-16">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-right text-gray-400">Updated Today</div>
              <h2 className="text-4xl font-bold">$5,254.50</h2>
              <p className="text-gray-400">Total Balance</p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-300">Recent Transactions</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex justify-between">
                    <span>Coffee Shop</span>
                    <span className="text-red-500">- $4.50</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grocery Store</span>
                    <span className="text-red-500">- $32.75</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Salary Deposit</span>
                    <span className="text-green-500">+ $1,200.00</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-300">Savings Goal</h4>
                  <div className="bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-right text-gray-400 mt-1">$650 / $1,000</div>
                </div>
                <div>
                  <h4 className="text-gray-300">Monthly Budget</h4>
                  <div className="bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="text-right text-gray-400 mt-1">$2,400 / $3,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;