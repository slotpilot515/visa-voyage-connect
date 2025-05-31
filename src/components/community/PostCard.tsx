// src/components/community/PostCard.tsx
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-1">{post.title}</h2>
      <p className="text-sm text-gray-400">{post.content}</p>

      <div className="text-xs text-gray-500 mt-2">
        {post.name && <p><strong>By:</strong> {post.name}</p>}
        {post.type === "experience" && (
          <>
            <p><strong>From:</strong> {post.fromCountry} {post.fromState && `(${post.fromState})`}</p>
            <p><strong>To:</strong> {post.toCountry}</p>
            <p><strong>Visa Type:</strong> {post.visaType}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded ${post.status === "Approved" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
                {post.status}
              </span>
            </p>
            <p><strong>Appointment:</strong> {post.appointmentDate} at {post.appointmentTime}</p>
          </>
        )}

        {post.type === "companion" && post.flightDetails && (
          <>
            <p><strong>From:</strong> {post.flightDetails.from}</p>
            <p><strong>To:</strong> {post.flightDetails.to}</p>
            <p><strong>Airline:</strong> {post.flightDetails.airline}</p>
            <p><strong>PNR:</strong> {post.flightDetails.pnr}</p>
          </>
        )}

        <p className="mt-1">Posted: {post.createdAt?.toDate().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PostCard;