import React, { useState } from 'react';

export default function ReturnsManager() {
  const [activeTab, setActiveTab] = useState('return');
  const [returnData, setReturnData] = useState({
    productName: '',
    quantity: '',
    reason: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý submit form
    console.log(returnData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReturnData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'return' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('return')}
          >
            Trả hàng
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('list')}
          >
            Danh sách trả hàng
          </button>
        </div>
      </div>

      {activeTab === 'return' ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Thông tin trả hàng</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  name="productName"
                  value={returnData.productName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={returnData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày trả</label>
                <input
                  type="date"
                  name="date"
                  value={returnData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lý do trả hàng</label>
                <textarea
                  name="reason"
                  value={returnData.reason}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Xác nhận trả hàng
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Danh sách trả hàng</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Sản phẩm</th>
                  <th className="px-6 py-3 text-left">Số lượng</th>
                  <th className="px-6 py-3 text-left">Ngày trả</th>
                  <th className="px-6 py-3 text-left">Lý do</th>
                </tr>
              </thead>
              <tbody>
                {/* Có thể thêm dữ liệu mẫu hoặc tích hợp với API */}
                <tr className="border-b">
                  <td className="px-6 py-4">Sản phẩm A</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">2024-01-20</td>
                  <td className="px-6 py-4">Sản phẩm bị lỗi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
