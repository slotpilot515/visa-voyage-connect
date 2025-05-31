import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
const postsRef = collection(db, "posts");
const querySnapshot = await getDocs(postsRef);

export interface Post {
  id?: string;
  title: string;
  content: string;
  country: string;
  visaType: string;
  status: string;
  flightDate?: string;
  flightTime?: string;
  airline?: string;
  pnr?: string;
  createdAt?: any;
  likes?: number;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
    setPosts(data);
  };

  const createPost = async (post: Post) => {
    const newPost = { ...post, createdAt: serverTimestamp(), likes: 0 };
    await addDoc(collection(db, "posts"), newPost);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, createPost };
};