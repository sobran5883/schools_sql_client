"use client";

import { Input } from 'antd';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function UpdateSchool() {
  const router = useRouter();
  const { id } = useParams();

  const [school, setSchool] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await axios.get(`https://schools-mysqldb.onrender.com/schools/${id}`);
        // const res = await axios.get(`http://localhost:8800/schools/${id}`);
        setSchool(res.data);
      } catch (err) {
        console.error("Error fetching school details:", err);
      }
    };
    fetchSchool();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSchool((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://schools-mysqldb.onrender.com/school/${id}`, school);
      // await axios.put(`http://localhost:8800/school/${id}`, school);
      router.push("/");
    } catch (err) {
      console.error("Error updating school:", err);
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <form onSubmit={handleSubmit} className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex justify-center flex-col gap-4">
      <h1 className=" font-semibold text-lg">Update School details</h1>
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
        <button className='border-2 mb-10 border-green-700 text-green-600 font-semibold rounded-md p-2' type="submit">Update School</button>
      </form>
    </div>
  );
}
