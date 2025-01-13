
import React, { useState } from "react";

const SearchPatientRecord = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://mswharndhuwnyovnltyz.supabase.co/functions/v1/search-patient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ query: searchQuery }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to fetch results.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Patient Record</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by pet name, owner name, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Results */}
      <div>
        {results.length > 0 ? (
          <div>
            <h3>Search Results:</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                    Pet Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                    Owner Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                    Phone
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                    Diagnosis
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                    Last Treatment Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {result.pet_name}
                    </td>
                    <td
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {result.owner_name}
                    </td>
                    <td
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {result.owner_phone}
                    </td>
                    <td
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {result.diagnosis}
                    </td>
                    <td
                      style={{ border: "1px solid #ddd", padding: "10px" }}
                    >
                      {result.last_treatment_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPatientRecord;
