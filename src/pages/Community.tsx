import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, GraduationCap, MessageSquare, Users } from 'lucide-react';
import CreatePostModal from '../components/community/CreatePostModal';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';

const Community = () => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const getCurrentPostType = () => {
    switch (activeTab) {
      case 'experiences': return 'experience';
      case 'discussions': return 'discussion';
      case 'companions':  return 'companion';
      default: return 'experience';
    }
  };

  const { posts, loading } = usePosts(getCurrentPostType());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: 'Search initiated',
        description: `Searching for: "${searchTerm}"`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-4xl font-bold mb-6">
            Community Hub
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}} className="text-xl text-gray-300 mb-8">
            Share experiences, find travel companions, and get visa advice from the community
          </motion.p>
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search discussions, experiences, or travel companions..."
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <button onClick={()=>setIsCreateModalOpen(true)} className="bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2">
          <Plus className="h-5 w-5"/> <span>Create Post</span>
        </button>
      </div>

      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <GraduationCap className="h-8 w-8 text-gray-700 mb-2" />
            <p className="text-2xl font-bold">1,234+</p>
            <p className="text-gray-600">Visa Experiences</p>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="h-8 w-8 text-gray-700 mb-2" />
            <p className="text-2xl font-bold">5,678+</p>
            <p className="text-gray-600">Active Discussions</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-gray-700 mb-2" />
            <p className="text-2xl font-bold">890+</p>
            <p className="text-gray-600">Travel Companions</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md flex">
              {['experiences','discussions','companions'].map(tab=>(
                <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-6 py-2 rounded-full ${activeTab===tab?'bg-gray-800 text-white':'text-gray-600 hover:text-gray-800'}`}>
                  {tab==='experiences'?'Visa Experiences':tab==='discussions'?'Discussions':'Travel Companions'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading posts…</p>
          ) : posts.length===0 ? (
            <p className="text-center text-gray-500">No posts found for "{activeTab}"</p>
          ) : (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {posts.map((post:any)=>(
                <div key={post.id} className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                  <p className="text-sm text-gray-500 mt-2">Type: {post.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CreatePostModal type={getCurrentPostType() as any} isOpen={isCreateModalOpen} onClose={()=>setIsCreateModalOpen(false)}/>
    </div>
  );
};

export default Community;