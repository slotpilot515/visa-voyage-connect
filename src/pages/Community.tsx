import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import CreatePostModal from "@/components/community/CreatePostModal";
import { motion } from "framer-motion";

const Community = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    };
    fetchPosts();
  }, [isModalOpen]);

  const filteredPosts = posts.filter((post) => post.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6">
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-4xl font-bold">SlotPilot</h1>
        <p className="text-gray-600 mt-1">Your trusted hub for visa support and travel companions</p>
        <div className="flex gap-4 mt-2 text-sm">
          <a href="https://whatsapp.com/channel/0029VaPCws2002T41zrJOa2V" className="text-green-600 font-medium">WhatsApp</a>
          <a href="#" className="text-pink-600 font-medium">Instagram</a>
          <a href="#" className="text-blue-600 font-medium">Telegram</a>
        </div>
      </div>

      <motion.div
        className="bg-yellow-100 text-yellow-800 font-semibold p-2 rounded shadow mb-6 overflow-hidden"
        animate={{ x: [0, -500] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        🚨 Beware of scammers! Always verify information before proceeding. 🌎 Stay connected for updates!
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["experience", "discussion", "companion", "accommodation"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "experience" ? "Visa Experience" : tab === "discussion" ? "Discussion" : tab === "companion" ? "Travel Companion" : "Accommodation"}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        + Create {activeTab === "experience" ? "Experience" : activeTab === "discussion" ? "Discussion" : activeTab === "companion" ? "Companion" : "Accommodation"} Post
      </button>

      <div className="mt-8 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{post.content}</p>
              {post.country && <p className="mt-2"><strong>From:</strong> {post.country}</p>}
              {post.flightDetails && (
                <div className="text-sm mt-2">
                  <p><strong>Flight:</strong> {post.flightDetails.from} ➔ {post.flightDetails.to}</p>
                  <p><strong>Airline:</strong> {post.flightDetails.airline} | <strong>PNR:</strong> {post.flightDetails.pnr}</p>
                  <p><strong>Date:</strong> {post.flightDetails.date} | <strong>Time:</strong> {post.flightDetails.time}</p>
                </div>
              )}
              {post.visaType && <p><strong>Visa Type:</strong> {post.visaType}</p>}
              {post.status && (
                <p className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${post.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {post.status}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">Posted: {post.createdAt?.toDate()?.toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet. Be the first to share your story!</p>
        )}
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={activeTab} />
    </div>
  );
};

export default Community;