import React, { useState } from "react";
import axios, { CancelTokenSource } from "axios";

const AgeByName: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  const fetchAge = async (cancelToken: CancelTokenSource) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.agify.io/?name=${name}`, {
        cancelToken: cancelToken.token,
      });
      setAge(response.data.age);
      setError(null);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        setError("Error fetching age");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cancelToken) {
      cancelToken.cancel("Request canceled by the user");
    }

    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    await fetchAge(newCancelToken);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <button type="submit">Get Age</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {age !== null && <p>Age: {age}</p>}
    </div>
  );
};

export default AgeByName;
