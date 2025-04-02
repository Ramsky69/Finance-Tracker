import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  status: string; // Added for "Result" column
}

const Dashboard = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    category: '',
    amount: 0,
    date: '',
    status: 'Pending',
  });
  const [sortBy, setSortBy] = useState<string>('Date'); // Default sorting by Date

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get<Transaction[]>('/transactions/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedTransactions = response.data.map((transaction) => ({
          ...transaction,
          amount: parseFloat(transaction.amount as unknown as string) || 0, // Ensure amount is a number
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleAddTransaction = async () => {
    try {
      const payload = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount.toFixed(2)), // Ensure amount is a decimal
        date: new Date(newTransaction.date).toISOString(),   // Convert date to ISO format
      };
      console.log('Sending transaction:', payload);
      const response = await api.post<Transaction>('/transactions/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Transaction added:', response.data);
      setTransactions([...transactions, response.data]);
      setNewTransaction({ description: '', category: '', amount: 0, date: '', status: 'Pending' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await api.delete(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    let sortedTransactions = [...transactions];
    if (criteria === 'Date') {
      sortedTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (criteria === 'Value/Cost') {
      sortedTransactions.sort((a, b) => a.description.localeCompare(b.description));
    } else if (criteria === 'Highest/Lowest Amount') {
      sortedTransactions.sort((a, b) => b.amount - a.amount);
    }
    setTransactions(sortedTransactions);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold text-white">
          <span className="text-purple-500">UC</span>ASH
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => console.log('Profile clicked')}
          >
            Profile
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={() => console.log('Logout clicked')}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-row gap-8">
        {/* Table Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Transaction</h1>
            <div>
              <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-300">
                Sort by:
              </label>
              <select
                id="sort"
                className="border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="Date">Date</option>
                <option value="Value/Cost">Value/Cost</option>
                <option value="Highest/Lowest Amount">Highest/Lowest Amount</option>
              </select>
            </div>
          </div>
          <div className="shadow overflow-hidden border border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Delete?
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Section */}
        <aside className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Category</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Purpose</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300"
                placeholder="e.g., Grocery Shopping"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select
                className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              >
                <option value="">Select a category</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Insurance">Insurance</option>
                <option value="Savings">Savings</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Date</label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Amount</label>
              <input
                type="number"
                className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-900 text-gray-300"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleAddTransaction}
            >
              + Add Transaction
            </button>
          </form>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;