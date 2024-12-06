"use client"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Schools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchAllSchools = async () => {
      try {
        const res = await axios.get("https://schools-mysqldb.onrender.com/schools");
        setSchools(res.data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchAllSchools();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://schools-mysqldb.onrender.com/schools/${id}`);
      setSchools((prev) => prev.filter((school) => school.id !== id));
    } catch (err) {
      console.error("Error deleting school:", err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {schools.map((school) => (
          <div className="flex gap-2 flex-col justify-center items-center border-2 py-6 rounded-sm" key={school.id}>
            <div className="flex flex-col gap-2">
              {school.image && (
                <img  src={school.image}  alt={school.name}  style={{ width: "250px", height: "150px" }}/>
              )}
              <h2 className="flex gap-2"><p className=" font-semibold">Name:</p> {school.name}</h2>
              <h1 className="flex gap-2"><p className=" font-semibold">Address:</p> {school.address}</h1>
              <h1 className="flex gap-2"><p className=" font-semibold">State:</p>  {school.city}, {school.state}</h1>
              {/* <p>Contact: {school.contact}</p>
              <p>Email: {school.email}</p> */}
            </div>
            <div className=" w-[250px] flex justify-between ">
              <button className="border p-2 rounded-md text-red-500" onClick={() => handleDelete(school.id)} >
                Delete
              </button>
              <button className="border p-2 rounded-md text-green-700">
                <Link href={`/update/${school.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
