import React, { useState } from "react";

const SoldTab = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [productName, setProductName] = useState('');

    return (
      <div className="p-4">
        {/* Bộ lọc */}
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Bộ lọc</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-1">Từ ngày</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Đến ngày</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Số điện thoại khách hàng</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Nhập số điện thoại"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tên sản phẩm</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Nhập tên sản phẩm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Lọc dữ liệu
          </button>
        </div>

        {/* Bảng dữ liệu */}
        <div className="bg-white rounded shadow">
          <p className="p-4">Danh sách hàng đã bán hiển thị tại đây.</p>
        </div>
      </div>
    );
  }

  export default SoldTab