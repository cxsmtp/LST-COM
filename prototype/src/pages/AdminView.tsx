import { useState } from 'react';
import { AppState } from '../types';
import { BarChart3, Users, Building2, TrendingUp } from 'lucide-react';
import Card from '../components/Card';

interface AdminViewProps {
  appState: AppState;
  updateAppState?: (updates: Partial<AppState>) => void;
}

type AdminTab = 'overview' | 'buyers' | 'suppliers' | 'rfqs' | 'transactions' | 'activity';

export default function AdminView({ appState }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const totalRFQValue = appState.rfqs.reduce((sum, rfq) => {
    const quotes = appState.quotes.filter(q => q.rfqId === rfq.id);
    return sum + (quotes[0]?.totalPrice || 0);
  }, 0);

  const gmv = appState.transactions.reduce((sum, t) => sum + t.value, 0);
  const platformRevenue = gmv * 0.05; // Assume 5% commission
  const conversionRate = appState.transactions.length > 0
    ? (appState.transactions.length / appState.rfqs.length * 100).toFixed(1)
    : '0.0';

  const activityEvents = [
    ...appState.rfqs.slice(0, 5).map(rfq => ({
      type: 'rfq',
      message: `${appState.buyers.find(b => b.id === rfq.buyerId)?.company || 'Buyer'} created an RFQ`,
      detail: rfq.product,
      value: `${rfq.quantity} ${rfq.unit}`,
      time: rfq.createdAt,
    })),
    ...appState.quotes.slice(0, 5).map(quote => ({
      type: 'quote',
      message: `${appState.sellers.find(s => s.id === quote.sellerId)?.company || 'Supplier'} submitted a quote`,
      detail: `$${quote.totalPrice.toLocaleString()}`,
      value: quote.rfqId,
      time: quote.createdAt,
    })),
    ...appState.transactions.slice(0, 5).map(tx => ({
      type: 'transaction',
      message: 'Quote accepted',
      detail: `${appState.buyers.find(b => b.id === tx.buyerId)?.company} ↔ ${appState.sellers.find(s => s.id === tx.sellerId)?.company}`,
      value: `$${tx.value.toLocaleString()}`,
      time: tx.createdAt,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const renderOverview = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Marketplace Overview</h1>
        <p className="text-lg text-text-secondary mt-2">Monitor buyers, suppliers, RFQs and marketplace activity</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Registered Buyers</p>
              <p className="text-4xl font-bold text-primary">{appState.buyers.length}</p>
              <p className="text-xs text-text-secondary mt-2">Sample data</p>
            </div>
            <Users className="text-blue-500" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Verified Suppliers</p>
              <p className="text-4xl font-bold text-primary">
                {appState.sellers.filter(s => s.verified).length}
              </p>
              <p className="text-xs text-text-secondary mt-2">Sample data</p>
            </div>
            <Building2 className="text-green-500" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Active RFQs</p>
              <p className="text-4xl font-bold text-primary">{appState.rfqs.length}</p>
              <p className="text-xs text-text-secondary mt-2">Sample data</p>
            </div>
            <BarChart3 className="text-purple-500" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">RFQ Value</p>
              <p className="text-4xl font-bold text-primary">${(totalRFQValue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-text-secondary mt-2">Sample data</p>
            </div>
            <TrendingUp className="text-amber-500" size={28} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <p className="text-text-secondary text-sm mb-1">Total Transactions</p>
          <p className="text-4xl font-bold text-primary">{appState.transactions.length}</p>
          <p className="text-xs text-text-secondary mt-2">Sample data</p>
        </Card>

        <Card>
          <p className="text-text-secondary text-sm mb-1">Marketplace GMV</p>
          <p className="text-4xl font-bold text-primary">${(gmv / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-text-secondary mt-2">Sample data</p>
        </Card>

        <Card>
          <p className="text-text-secondary text-sm mb-1">Platform Revenue</p>
          <p className="text-4xl font-bold text-primary">${(platformRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-text-secondary mt-2">Est. (5% commission)</p>
        </Card>

        <Card>
          <p className="text-text-secondary text-sm mb-1">Conversion Rate</p>
          <p className="text-4xl font-bold text-primary">{conversionRate}%</p>
          <p className="text-xs text-text-secondary mt-2">RFQ to Transaction</p>
        </Card>
      </div>
    </div>
  );

  const renderBuyers = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Buyer Directory</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border-light">
              <th className="text-left py-4 px-4 font-bold text-primary">Company</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Contact</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Location</th>
              <th className="text-left py-4 px-4 font-bold text-primary">RFQs</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Total Spend</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {appState.buyers.map(buyer => (
              <tr key={buyer.id} className="border-b border-border-light hover:bg-bg-light">
                <td className="py-4 px-4 font-semibold text-primary">{buyer.company}</td>
                <td className="py-4 px-4 text-text-secondary">{buyer.name}</td>
                <td className="py-4 px-4 text-text-secondary">{buyer.location}</td>
                <td className="py-4 px-4 text-primary">{buyer.rfqCount}</td>
                <td className="py-4 px-4 font-semibold text-primary">${(buyer.totalSpend / 1000).toFixed(0)}K</td>
                <td className="py-4 px-4">
                  {buyer.verified && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSuppliers = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Supplier Directory</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border-light">
              <th className="text-left py-4 px-4 font-bold text-primary">Company</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Category</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Location</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Rating</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Deals Won</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {appState.sellers.map(seller => (
              <tr key={seller.id} className="border-b border-border-light hover:bg-bg-light">
                <td className="py-4 px-4 font-semibold text-primary">{seller.company}</td>
                <td className="py-4 px-4 text-text-secondary">{seller.category}</td>
                <td className="py-4 px-4 text-text-secondary">{seller.location}</td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-primary">⭐ {seller.rating}</span>
                </td>
                <td className="py-4 px-4 font-semibold text-primary">{seller.dealsCompleted}</td>
                <td className="py-4 px-4">
                  {seller.verified && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRFQs = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">RFQ Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border-light">
              <th className="text-left py-4 px-4 font-bold text-primary">RFQ ID</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Buyer</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Product</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Quantity</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Suppliers</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Quotes</th>
              <th className="text-left py-4 px-4 font-bold text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {appState.rfqs.map(rfq => {
              const buyer = appState.buyers.find(b => b.id === rfq.buyerId);
              return (
                <tr key={rfq.id} className="border-b border-border-light hover:bg-bg-light">
                  <td className="py-4 px-4 font-bold text-accent cursor-pointer hover:underline">{rfq.id}</td>
                  <td className="py-4 px-4 text-text-secondary">{buyer?.company}</td>
                  <td className="py-4 px-4 text-primary">{rfq.product}</td>
                  <td className="py-4 px-4 text-primary">{rfq.quantity} {rfq.unit}</td>
                  <td className="py-4 px-4 text-primary">{rfq.suppliersMatched}</td>
                  <td className="py-4 px-4 text-primary font-semibold">{rfq.quotesCount}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded ${
                      rfq.status === 'Quote Received'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {rfq.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Transaction Management</h1>

      {selectedTransaction ? (
        (() => {
          const tx = appState.transactions.find(t => t.id === selectedTransaction);
          if (!tx) return null;

          const buyer = appState.buyers.find(b => b.id === tx.buyerId);
          const seller = appState.sellers.find(s => s.id === tx.sellerId);

          return (
            <Card>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary">{tx.id}</h2>
                  <p className="text-lg text-text-secondary mt-2">{tx.product}</p>
                </div>
                <span className="text-sm font-semibold px-3 py-1.5 rounded bg-blue-100 text-blue-700">
                  {tx.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-bg-light rounded">
                  <p className="text-text-secondary text-sm mb-2">Buyer</p>
                  <p className="text-xl font-bold text-primary">{buyer?.company}</p>
                  <p className="text-text-secondary text-sm mt-1">{buyer?.location}</p>
                </div>
                <div className="p-6 bg-bg-light rounded">
                  <p className="text-text-secondary text-sm mb-2">Seller</p>
                  <p className="text-xl font-bold text-primary">{seller?.company}</p>
                  <p className="text-text-secondary text-sm mt-1">{seller?.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-accent-light rounded">
                  <p className="text-text-secondary text-sm">Quantity</p>
                  <p className="text-2xl font-bold text-primary">{tx.quantity}</p>
                </div>
                <div className="p-4 bg-accent-light rounded">
                  <p className="text-text-secondary text-sm">Value</p>
                  <p className="text-2xl font-bold text-accent">${tx.value.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-accent-light rounded">
                  <p className="text-text-secondary text-sm">Commission (5%)</p>
                  <p className="text-2xl font-bold text-accent">${(tx.value * 0.05).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-accent-light rounded">
                  <p className="text-text-secondary text-sm">Date</p>
                  <p className="text-2xl font-bold text-primary">{tx.createdAt}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg text-primary mb-6">Transaction Timeline</h3>
                <div className="space-y-4">
                  {tx.timeline.map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-accent rounded-full mt-2"></div>
                        {idx < tx.timeline.length - 1 && (
                          <div className="w-1 h-12 bg-border-light"></div>
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="font-bold text-primary">{event.status}</p>
                        <p className="text-text-secondary text-sm">{event.timestamp}</p>
                        <p className="text-text-secondary text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-accent font-semibold hover:underline"
              >
                ← Back to Transactions
              </button>
            </Card>
          );
        })()
      ) : (
        <div className="space-y-3">
          {appState.transactions.map(tx => {
            const buyer = appState.buyers.find(b => b.id === tx.buyerId);
            const seller = appState.sellers.find(s => s.id === tx.sellerId);

            return (
              <Card
                key={tx.id}
                clickable
                onClick={() => setSelectedTransaction(tx.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-primary">{tx.id}</p>
                    <p className="text-text-secondary text-sm">{tx.product}</p>
                    <p className="text-text-secondary text-sm mt-2">
                      {buyer?.company} ↔ {seller?.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent font-bold text-xl">${tx.value.toLocaleString()}</p>
                    <span className="text-xs font-semibold px-3 py-1 rounded bg-blue-100 text-blue-700 block mt-2">
                      {tx.status}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderActivity = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Live Activity Feed</h1>

      <div className="space-y-2">
        {activityEvents.map((event, idx) => (
          <Card key={idx} className="flex gap-4 items-start">
            <div className="text-2xl mt-1 flex-shrink-0">
              {event.type === 'rfq' && '📋'}
              {event.type === 'quote' && '💰'}
              {event.type === 'transaction' && '✅'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary">{event.message}</p>
              <p className="text-text-secondary text-sm">{event.detail}</p>
              {event.value && (
                <p className="text-accent font-semibold text-sm mt-1">{event.value}</p>
              )}
            </div>
            <div className="text-text-secondary text-xs">
              {event.time}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'buyers', label: 'Buyers' },
              { id: 'suppliers', label: 'Suppliers' },
              { id: 'rfqs', label: 'RFQs' },
              { id: 'transactions', label: 'Transactions' },
              { id: 'activity', label: 'Activity Feed' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSelectedTransaction(null);
                }}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'buyers' && renderBuyers()}
      {activeTab === 'suppliers' && renderSuppliers()}
      {activeTab === 'rfqs' && renderRFQs()}
      {activeTab === 'transactions' && renderTransactions()}
      {activeTab === 'activity' && renderActivity()}
    </div>
  );
}
