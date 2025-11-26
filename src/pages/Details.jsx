import React from "react";
import { useParams } from "react-router";

export default function Details() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Details - {id}</h1>
      <p>Details of the service with ID: {id}</p>
    </div>
  );
}
