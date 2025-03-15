import React, { useEffect, useState } from 'react';
import { checkHealth } from '../api/api';

const TestPage: React.FC = () => {

     const [healthStatus, setHealthStatus] = useState<string | null>(null);
    
    useEffect(() => {
  const fetchHealth = async () => {
    try {
      const data = await checkHealth();
      console.log("Fetched Health Data:", data);
      setHealthStatus(data?.status || "Error");
    } catch (error) {
      console.error("Error fetching health status:", error);
      setHealthStatus("Error");
    }
  };

  fetchHealth();
}, []);


  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">Test Page</h1>
      <p className="mt-4 text-lg">Backend Health: {healthStatus}</p>
    </div>
  );
};

export default TestPage;
