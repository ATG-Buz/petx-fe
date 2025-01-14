'use client'

import React, { useState } from 'react';

const tabs = [
  { id: 'sales', label: 'Quản lý bán hàng' },
  { id: 'inventory', label: 'Quản lý nhập hàng' },
  { id: 'returns', label: 'Quản lý trả hàng' },
  { id: 'employees', label: 'Quản lý nhân viên' },
];

export default function Tab({ children }:any) {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex space-x-4 p-4">
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
      </nav>

      <main className="container mx-auto p-4">{children(activeTab)}</main>
    </div>
  );
}
