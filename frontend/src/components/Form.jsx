import React, { useState } from 'react';
import axios from 'axios';


const form = () => {
  const [formData, setFormData] = useState({
    username: '',
    language:'',
    stdin: '',
    sourceCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/submit', formData);
      console.log(response.data);
      // Reset form fields
      setFormData({
        username: '',
        language:'',
        stdin: '',
        sourceCode: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
<div className="w-70  p-10 max-w-xl h-auto bg-gradient-to-br from-green-500 to-purple-700 text-white mx-auto mt-100 rounded-lg  text-center ">


    <form onSubmit={handleSubmit} className='mt-10' >
      <div className='flex items-center justify-center '>
        <label className='font-bold '>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border-0 outline-none bg-ebfffc h-8 rounded-sm mb-3 text-black"
        />
      </div>
      <div className='flex items-center justify-center'>
        <label className='font-bold '>Language:</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
          className="border-0 outline-none bg-ebfffc h-8 rounded-sm mb-5 text-black"
        />
      </div>
      <div className='flex items-center justify-center'>
        <label className='font-bold '>Standard Input:</label>
        <textarea
          name="stdin"
          value={formData.stdin}
          onChange={handleChange}
          required
          className="border-0 outline-none bg-ebfffc h-[96px] 2-52 rounded-sm mb-3 text-black"
        />
      </div>
      <div className='flex items-center justify-center'>
        <label className='font-bold '>Source Code:</label>
        <textarea
          name="sourceCode"
          value={formData.sourceCode}
          onChange={handleChange}
          required
          className="border-0 outline-none bg-ebfffc h-[150px] w-60 rounded-sm mb-3 text-black"
        />
      </div>
      <button type="submit" className="border-0 outline-none bg-ebfffc rounded-full w-60 h-60 cursor-pointer">Submit</button>
    </form>
    </div>
  )
}

export default form






