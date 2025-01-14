import React, { useState, useEffect } from 'react'

const SellTab = () => {
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [searchProduct, setSearchProduct] = useState('');
    const [productResults, setProductResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    // Giả lập tìm kiếm khách hàng
    const searchCustomer = (phone: string) => {
        // TODO: Gọi API tìm kiếm khách hàng theo số điện thoại
        console.log("Searching customer with phone:", phone);
    }

    // Giả lập tìm kiếm sản phẩm realtime
    useEffect(() => {
        if (searchProduct) {
            // TODO: Gọi API tìm kiếm sản phẩm
            console.log("Searching products:", searchProduct);
        }
    }, [searchProduct]);

    return (
        <div className="p-2 md:p-4">
            {/* Phần thông tin khách hàng */}
            <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3">Thông tin khách hàng</h3>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại khách hàng"
                        className="border p-2 rounded w-full md:w-1/3 mb-2 md:mb-0"
                        value={customerPhone}
                        onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            searchCustomer(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Tên khách hàng"
                        className="border p-2 rounded w-full md:w-1/3 mb-2 md:mb-0"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ khách hàng"
                        className="border p-2 rounded w-full md:w-1/3"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                </div>
            </div>

            {/* Phần tìm kiếm sản phẩm */}
            <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3">Tìm kiếm sản phẩm</h3>
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    className="border p-2 rounded w-full mb-2"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                />
                
                {/* Kết quả tìm kiếm sản phẩm */}
                {productResults.length > 0 && (
                    <div className="border rounded p-2 mb-4">
                        {/* TODO: Hiển thị danh sách sản phẩm tìm được */}
                    </div>
                )}
            </div>

            {/* Thông tin bán hàng */}
            {selectedProduct && (
                <div className="border rounded p-2 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold mb-3">Chi tiết bán hàng</h3>
                    <div className="space-y-3 md:space-y-4">
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Số lượng:</label>
                            <input
                                type="number"
                                min="1"
                                className="border p-2 rounded w-full"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Đơn giá:</label>
                            <input
                                type="number"
                                className="border p-2 rounded w-full"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Thành tiền:</label>
                            <div className="font-bold text-base md:text-lg">{price * quantity} VNĐ</div>
                        </div>
                        <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                            Xác nhận bán hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellTab