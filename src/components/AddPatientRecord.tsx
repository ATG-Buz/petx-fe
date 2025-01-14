"use client"
import React, { useState } from "react";

const AddPatientRecord = () => {
  const [activeTab, setActiveTab] = useState("info"); // info, treatment, payment
  const [searchResults, setSearchResults] = useState<any[]>([]); // Thêm state cho kết quả tìm kiếm
  const [showSearchResults, setShowSearchResults] = useState(false); // Thêm state để điều khiển hiển thị kết quả
  const [formData, setFormData] = useState({
    pets: [{
      name: "",
      type: "",
      breed: "",
      color: "", 
      gender: "",
      weight: "",
      birthdate: "",
    }],
    owner: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    treatment: {
      diagnosis: "",
      treatment_date: "",
      medications: [{ medication_name: "", dosage: "" }],
      notes: "",
    },
    payment: {
      method: "",
      amount: "",
      status: "Đã thanh toán",
      paid_at: "",
    },
  });

  const handleChange = (section: string, key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handlePetChange = (index: number, key: string, value: string) => {
    const updatedPets = [...formData.pets];
    updatedPets[index] = {
      ...updatedPets[index],
      [key]: value
    };
    setFormData(prev => ({
      ...prev,
      pets: updatedPets
    }));
  };

  const addPet = () => {
    setFormData(prev => ({
      ...prev,
      pets: [...prev.pets, {
        name: "",
        type: "",
        breed: "",
        color: "",
        gender: "",
        weight: "",
        birthdate: "",
      }]
    }));
  };

  const handleMedicationsChange = (index: number, key: string, value: string) => {
    const updatedMedications = [...formData.treatment.medications];
    updatedMedications[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: updatedMedications,
      },
    }));
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        medications: [
          ...prev.treatment.medications,
          { medication_name: "", dosage: "" },
        ],
      },
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://mswharndhuwnyovnltyz.supabase.co/functions/v1/search-patient?phone=${formData.owner.phone}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && data) {
        setSearchResults(data); // Lưu kết quả tìm kiếm vào state
        setShowSearchResults(true); // Hiển thị modal kết quả tìm kiếm
      } else {
        alert("Không tìm thấy thông tin khách hàng.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm.");
    }
  };

  const selectSearchResult = (result: any) => {
    setFormData(prev => ({
      ...prev,
      owner: result.owner,
      pets: result.pets
    }));
    setShowSearchResults(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mswharndhuwnyovnltyz.supabase.co/functions/v1/add-patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Thêm hồ sơ bệnh nhân thành công!");
      } else {
        console.error("Lỗi:", data.error);
        alert("Không thể thêm hồ sơ bệnh nhân.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi không mong muốn.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Hồ Sơ Bệnh Nhân</h2>

      {/* Modal hiển thị kết quả tìm kiếm */}
      {showSearchResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h3>
            {searchResults.map((result, index) => (
              <div 
                key={index}
                className="p-4 border rounded mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => selectSearchResult(result)}
              >
                <p>Tên chủ sở hữu: {result.owner.name}</p>
                <p>Số điện thoại: {result.owner.phone}</p>
                <p>Số lượng thú cưng: {result.pets.length}</p>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setShowSearchResults(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Thông tin chủ sở hữu & thú cưng
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'treatment' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('treatment')}
        >
          Thông tin điều trị
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === 'payment' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Thông tin thanh toán
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* Thông tin chủ sở hữu & thú cưng */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Thông tin chủ sở hữu */}
            <fieldset className="p-4 border rounded-lg space-y-4">
              <legend className="font-semibold text-lg px-2">Thông tin chủ sở hữu</legend>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={formData.owner.phone}
                  onChange={(e) => handleChange("owner", "phone", e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Tìm kiếm
                </button>
              </div>
              <input
                type="text"
                placeholder="Tên chủ sở hữu"
                value={formData.owner.name}
                onChange={(e) => handleChange("owner", "name", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.owner.email}
                onChange={(e) => handleChange("owner", "email", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={formData.owner.address}
                onChange={(e) => handleChange("owner", "address", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </fieldset>

            {/* Thông tin thú cưng */}
            <div className="space-y-4">
              {formData.pets.map((pet, index) => (
                <fieldset key={index} className="p-4 border rounded-lg space-y-4">
                  <legend className="font-semibold text-lg px-2">Thông tin thú cưng {index + 1}</legend>
                  <input
                    type="text"
                    placeholder="Tên thú cưng"
                    value={pet.name}
                    onChange={(e) => handlePetChange(index, "name", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Loại (VD: Chó, Mèo)"
                    value={pet.type}
                    onChange={(e) => handlePetChange(index, "type", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Giống"
                    value={pet.breed}
                    onChange={(e) => handlePetChange(index, "breed", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Màu sắc"
                    value={pet.color}
                    onChange={(e) => handlePetChange(index, "color", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Giới tính"
                    value={pet.gender}
                    onChange={(e) => handlePetChange(index, "gender", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Cân nặng (kg)"
                    value={pet.weight}
                    onChange={(e) => handlePetChange(index, "weight", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="date"
                    placeholder="Ngày sinh"
                    value={pet.birthdate}
                    onChange={(e) => handlePetChange(index, "birthdate", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </fieldset>
              ))}
              <button
                type="button"
                onClick={addPet}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Thêm thú cưng
              </button>
            </div>
          </div>
        )}

        {/* Thông tin điều trị */}
        {activeTab === 'treatment' && (
          <fieldset className="p-4 border rounded-lg space-y-4">
            <legend className="font-semibold text-lg px-2">Thông tin điều trị</legend>
            <input
              type="text"
              placeholder="Chẩn đoán"
              value={formData.treatment.diagnosis}
              onChange={(e) => handleChange("treatment", "diagnosis", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Ngày điều trị"
              value={formData.treatment.treatment_date}
              onChange={(e) =>
                handleChange("treatment", "treatment_date", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            {formData.treatment.medications.map((medication, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Tên thuốc"
                  value={medication.medication_name}
                  onChange={(e) =>
                    handleMedicationsChange(index, "medication_name", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Liều lượng"
                  value={medication.dosage}
                  onChange={(e) =>
                    handleMedicationsChange(index, "dosage", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addMedication}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thêm thuốc
            </button>
            <textarea
              placeholder="Ghi chú"
              value={formData.treatment.notes}
              onChange={(e) => handleChange("treatment", "notes", e.target.value)}
              className="w-full p-2 border rounded h-24"
            ></textarea>
          </fieldset>
        )}

        {/* Thông tin thanh toán */}
        {activeTab === 'payment' && (
          <fieldset className="p-4 border rounded-lg space-y-4">
            <legend className="font-semibold text-lg px-2">Thông tin thanh toán</legend>
            <input
              type="text"
              placeholder="Phương thức thanh toán (VD: Tiền mặt, Thẻ tín dụng)"
              value={formData.payment.method}
              onChange={(e) => handleChange("payment", "method", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Số tiền"
              value={formData.payment.amount}
              onChange={(e) => handleChange("payment", "amount", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              placeholder="Ngày thanh toán"
              value={formData.payment.paid_at}
              onChange={(e) => handleChange("payment", "paid_at", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </fieldset>
        )}
      </div>

      <button 
        type="submit"
        className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
      >
        Gửi
      </button>
    </form>
  );
};

export default AddPatientRecord;
