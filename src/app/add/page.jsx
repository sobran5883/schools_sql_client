"use client";

import { Input } from 'antd';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddSchoolPage() {
  const router = useRouter();

  // State for school fields
  const [school, setSchool] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    image: "",
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSchool((prev) => ({
        ...prev,
        image: reader.result, // Set Base64 image string
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://schools-mysqldb.onrender.com/schools", school); // Update URL if deployed
      router.push("/"); // Redirect to the home page after successful addition
    } catch (err) {
      console.error("Error adding school:", err);
    }
  };

  return (
    <div className='w-full flex justify-center'>

      <form onSubmit={handleSubmit} className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex justify-center flex-col gap-4">
      <h1 className='text-lg font-semibold'>Add New School details</h1>
        <Input
          type="text"
          name="name"
          placeholder="School Name"
          value={school.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={school.address}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={school.city}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="state"
          placeholder="State"
          value={school.state}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={school.contact}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={school.email}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {school.image && (
          <img
            src={school.image}
            alt="Preview"
            style={{ width: "250px", height: "150px", marginTop: "10px" }}
          />
        )}
        <button className='border-2 border-green-700 text-green-600 font-semibold rounded-md p-2' type="submit">Add School</button>
      </form>
    </div>
  );
}
