import { useState } from "react";

export default function SearchPetsAndOwners() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ pets: [], owners: [] });

  const search = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for pets or owners"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <div>
        <h3>Pets</h3>
        <ul>
          {results.pets.map((pet) => (
            <li key={pet.id}>{pet.name} ({pet.species})</li>
          ))}
        </ul>
        <h3>Owners</h3>
        <ul>
          {results.owners.map((owner) => (
            <li key={owner.id}>{owner.name} - {owner.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
