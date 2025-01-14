'use client'

import React, { useState, useEffect } from 'react';
// import { getInventory, addStockImport, updateStockQuantity } from './api';

export default function InventoryManager() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    costPrice: '',
    supplierName: '',
  });

  // Fetch inventory data
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        const data = []//await getInventory();
        setInventory(data);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { productId, quantity, costPrice, supplierName } = form;

    try {
      // Thêm hàng nhập mới
    //   await addStockImport(productId, parseInt(quantity), parseFloat(costPrice), supplierName);

      // Cập nhật số lượng tồn kho
      const product = inventory.find((item) => item.id === productId);
      const newQuantity = (product.stock_quantity || 0) + parseInt(quantity);
    //   await updateStockQuantity(productId, newQuantity);

      // Cập nhật giao diện
      setInventory((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, stock_quantity: newQuantity } : item
        )
      );

      alert('Hàng nhập đã được thêm thành công!');
      setForm({ productId: '', quantity: '', costPrice: '', supplierName: '' });
    } catch (error) {
      console.error('Failed to add stock import:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
      {/* Form nhập hàng mới */}
      <div>
        <h3 className="text-lg font-medium mb-2">Nhập hàng mới</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Sản phẩm</label>
            <select
              className="w-full border px-4 py-2"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              required
            >
              <option value="">-- Chọn sản phẩm --</option>
              {inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Số lượng</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Giá nhập</label>
              <input
                type="number"
                step="0.01"
                className="w-full border px-4 py-2"
                value={form.costPrice}
                onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Nhà cung cấp</label>
              <input
                type="text"
                className="w-full border px-4 py-2"
                value={form.supplierName}
                onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Thêm hàng nhập
          </button>
        </form>
      </div>
       {/* Danh sách hàng tồn */}
       <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Danh sách hàng tồn kho</h3>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
                <th className="border border-gray-300 px-4 py-2">Danh mục</th>
                <th className="border border-gray-300 px-4 py-2">Số lượng tồn</th>
                <th className="border border-gray-300 px-4 py-2">Giá bán</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.stock_quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
