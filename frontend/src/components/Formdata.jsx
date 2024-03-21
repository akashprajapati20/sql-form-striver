import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormData= () => {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/data');
      setFormDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
  <h2 className="text-xl font-bold mb-4">Form Data</h2>
  <div className="overflow-x-auto">
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Language</th>
          <th className="px-4 py-2">Standard Input</th>
          <th className="px-4 py-2">Source Code</th>
          <th className="px-4 py-2">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {formDataList.map((formData, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="px-4 py-2">{formData.username}</td>
            <td className="px-4 py-2">{formData.language}</td>
            <td className="px-4 py-2">{formData.input}</td>
            <td className="px-4 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">{formData.code.length > 100 ? formData.code.slice(0, 100) + "..." : formData.code}</td>
            <td className="px-4 py-2">{formData.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default FormData;
