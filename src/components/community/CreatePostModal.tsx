import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from './RichTextEditor';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { usePosts } from '@/hooks/usePosts';

interface CreatePostModalProps {
  type: 'experience' | 'discussion' | 'companion';
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ type, isOpen, onClose }: CreatePostModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('');
  const [visaType, setVisaType] = useState('');
  const [topic, setTopic] = useState('');
  const [destination, setDestination] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        title,
        content,
        type,
        country,
        visaType,
        topic,
        destination,
        groupSize,
        startDate,
        endDate,
        tags,
        createdAt: serverTimestamp(),
        isPublic,
        image: imagePreview || '',
      };

      await addDoc(collection(db, 'posts'), payload);

      toast({
        title: '✅ Post created',
        description: 'Your post was saved in Firestore successfully.',
      });

      onClose();

      setTitle('');
      setContent('');
      setCountry('');
      setVisaType('');
      setTopic('');
      setDestination('');
      setGroupSize(1);
      setStartDate('');
      setEndDate('');
      setTags([]);
      setImagePreview(null);
    } catch (error) {
      console.error('Failed to post:', error);
      toast({
        title: '❌ Failed to create post',
        description: 'An error occurred while saving the post.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'experience': return 'Share Your Visa Experience';
      case 'discussion': return 'Start a Discussion';
      case 'companion': return 'Find Travel Companions';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">{getTitle()}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter title"
                required
              />
              <RichTextEditor content={content} onChange={setContent} />
              <input
                type="text"
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;