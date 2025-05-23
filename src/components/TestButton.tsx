import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Adjust path if needed

export default function TestButton() {
  return (
    <div className="p-4">
      <button
        onClick={async () => {
          try {
            await addDoc(collection(db, 'posts'), {
              title: 'Murali Manual Test',
              content: 'This post is created from hardcoded test',
              author: 'Murali',
              type: 'experience',
              createdAt: serverTimestamp(),
              likes: 0,
            });
            alert('✅ Test post added!');
          } catch (err) {
            console.error('❌ Firestore error:', err);
            alert('❌ Post failed. Check console.');
          }
        }}
        className="bg-green-600 text-white p-4 rounded-lg"
      >
        Add Test Post
      </button>
    </div>
  );
}
