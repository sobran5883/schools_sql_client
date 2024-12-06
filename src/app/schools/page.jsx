"use client"; // Enable client-side rendering

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
    <div>
      <h1>Schools Database</h1>
      <div className="schools">
        {schools.map((school) => (
          <div className="school" key={school.id}>
            {school.image && (
              <img
                src={school.image}
                alt={school.name}
                style={{ width: "150px", height: "200px" }}
              />
            )}
            <h2>{school.name}</h2>
            <p>{school.address}</p>
            <p>
              {school.city}, {school.state}
            </p>
            <p>Contact: {school.contact}</p>
            <p>Email: {school.email}</p>
            <button
              className="delete"
              onClick={() => handleDelete(school.id)}
            >
              Delete
            </button>
            <button className="update">
              <Link href={`/update/${school.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link href="/add">Add New School</Link>
      </button>
    </div>
  );
}
