import { useState } from "react";

const Example1 = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    // Simulate an error
    throw new Error("Simulated error");
  }

  return (
    <div>
      <h2>This is YourComponent</h2>
      <p>Click the button below to simulate an error.</p>
      <button onClick={() => setShouldThrowError(true)}>Trigger Error</button>
    </div>
  );
};

export default Example1;
