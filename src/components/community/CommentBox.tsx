// src/components/community/CommentBox.tsx

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

const CommentBox = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        createdAt: serverTimestamp(),
      });
      setComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded border p-2"
        />
        <button type="submit" className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
          Post
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="text-sm text-gray-700 border p-2 rounded">
            <p>{c.text}</p>
            {c.createdAt?.toDate && (
              <p className="text-xs text-gray-500">{c.createdAt.toDate().toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;