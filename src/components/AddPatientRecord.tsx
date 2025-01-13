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
      status: "Paid",
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
        alert("Patient record added successfully!");
      } else {
        console.error("Error:", data.error);
        alert("Failed to add patient record.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Patient Record</h2>

      {/* Owner Information */}
      <fieldset>
        <legend>Owner Information</legend>
        <input
          type="text"
          placeholder="Owner Name"
          value={formData.owner.name}
          onChange={(e) => handleChange("owner", "name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.owner.phone}
          onChange={(e) => handleChange("owner", "phone", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.owner.email}
          onChange={(e) => handleChange("owner", "email", e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.owner.address}
          onChange={(e) => handleChange("owner", "address", e.target.value)}
        />
      </fieldset>

      {/* Pet Information */}
      <fieldset>
        <legend>Pet Information</legend>
        <input
          type="text"
          placeholder="Pet Name"
          value={formData.pet.name}
          onChange={(e) => handleChange("pet", "name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Pet Type (e.g., Dog, Cat)"
          value={formData.pet.type}
          onChange={(e) => handleChange("pet", "type", e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed"
          value={formData.pet.breed}
          onChange={(e) => handleChange("pet", "breed", e.target.value)}
        />
        <input
          type="text"
          placeholder="Color"
          value={formData.pet.color}
          onChange={(e) => handleChange("pet", "color", e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={formData.pet.gender}
          onChange={(e) => handleChange("pet", "gender", e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={formData.pet.weight}
          onChange={(e) => handleChange("pet", "weight", e.target.value)}
        />
        <input
          type="date"
          placeholder="Birthdate"
          value={formData.pet.birthdate}
          onChange={(e) => handleChange("pet", "birthdate", e.target.value)}
        />
      </fieldset>

      {/* Treatment Information */}
      <fieldset>
        <legend>Treatment Information</legend>
        <input
          type="text"
          placeholder="Diagnosis"
          value={formData.treatment.diagnosis}
          onChange={(e) => handleChange("treatment", "diagnosis", e.target.value)}
        />
        <input
          type="date"
          placeholder="Treatment Date"
          value={formData.treatment.treatment_date}
          onChange={(e) =>
            handleChange("treatment", "treatment_date", e.target.value)
          }
        />
        {formData.treatment.medications.map((medication, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Medication Name"
              value={medication.medication_name}
              onChange={(e) =>
                handleMedicationsChange(index, "medication_name", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Dosage"
              value={medication.dosage}
              onChange={(e) =>
                handleMedicationsChange(index, "dosage", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addMedication}>
          Add Medication
        </button>
        <textarea
          placeholder="Notes"
          value={formData.treatment.notes}
          onChange={(e) => handleChange("treatment", "notes", e.target.value)}
        ></textarea>
      </fieldset>

      {/* Payment Information */}
      <fieldset>
        <legend>Payment Information</legend>
        <input
          type="text"
          placeholder="Payment Method (e.g., Cash, Credit Card)"
          value={formData.payment.method}
          onChange={(e) => handleChange("payment", "method", e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.payment.amount}
          onChange={(e) => handleChange("payment", "amount", e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Payment Date"
          value={formData.payment.paid_at}
          onChange={(e) => handleChange("payment", "paid_at", e.target.value)}
        />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPatientRecord;
