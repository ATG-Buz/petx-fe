import React, { useState } from 'react';
import SellTab from './SellTab';
import SoldTab from './SoldTab';

const tabs = [
  { id: 'sell', label: 'Bán hàng' },
  { id: 'sold', label: 'Danh sách hàng đã bán' },
];

export default function SalesManager() {
  const [activeTab, setActiveTab] = useState('sell');

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium rounded ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'sell' && <SellTab />}
      {activeTab === 'sold' && <SoldTab />}
    </div>
  );
}



