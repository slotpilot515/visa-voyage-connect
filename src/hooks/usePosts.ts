import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

export const usePosts = (type: string) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'posts'),
          where('type', '==', type),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(docs);
      } catch (err) {
        console.error("🔥 Firestore fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { posts, loading };
};