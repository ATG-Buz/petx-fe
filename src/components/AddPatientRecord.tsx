"use client"
import React, { useState } from "react";

const AddPatientRecord = () => {
  const [formData, setFormData] = useState({
    pet: {
      name: "",
      type: "",
      breed: "",
      color: "", 
      gender: "",
      weight: "",
      birthdate: "",
    },
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
      <h2 className="text-2xl font-bold mb-6">Thêm Hồ Sơ Bệnh Nhân Mới</h2>

      {/* Thông tin chủ sở hữu */}
      <fieldset className="p-4 border rounded-lg space-y-4">
        <legend className="font-semibold text-lg px-2">Thông tin chủ sở hữu</legend>
        <input
          type="text"
          placeholder="Tên chủ sở hữu"
          value={formData.owner.name}
          onChange={(e) => handleChange("owner", "name", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={formData.owner.phone}
          onChange={(e) => handleChange("owner", "phone", e.target.value)}
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
      <fieldset className="p-4 border rounded-lg space-y-4">
        <legend className="font-semibold text-lg px-2">Thông tin thú cưng</legend>
        <input
          type="text"
          placeholder="Tên thú cưng"
          value={formData.pet.name}
          onChange={(e) => handleChange("pet", "name", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Loại (VD: Chó, Mèo)"
          value={formData.pet.type}
          onChange={(e) => handleChange("pet", "type", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Giống"
          value={formData.pet.breed}
          onChange={(e) => handleChange("pet", "breed", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Màu sắc"
          value={formData.pet.color}
          onChange={(e) => handleChange("pet", "color", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Giới tính"
          value={formData.pet.gender}
          onChange={(e) => handleChange("pet", "gender", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Cân nặng (kg)"
          value={formData.pet.weight}
          onChange={(e) => handleChange("pet", "weight", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Ngày sinh"
          value={formData.pet.birthdate}
          onChange={(e) => handleChange("pet", "birthdate", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </fieldset>

      {/* Thông tin điều trị */}
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

      {/* Thông tin thanh toán */}
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
