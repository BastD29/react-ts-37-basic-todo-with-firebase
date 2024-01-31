import { useState, useEffect, FC } from "react";

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const Example2: FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (error) throw error; // Throw an error to be caught by an error boundary

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData?.name}</h1>
      <p>Email: {userData?.email}</p>
    </div>
  );
};

export default Example2;
