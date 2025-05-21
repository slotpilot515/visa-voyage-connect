
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, ThumbsUp, Share2, Globe, GraduationCap, Filter, Calendar, MapPin, Search, ChevronRight, Plus } from 'lucide-react';
import CreatePostModal from '../components/community/CreatePostModal';
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const visaExperiences = [
  {
    id: '1',
    title: 'My F1 Visa Success Story',
    content: 'I recently got my F1 visa approved for studying in the US. Here\'s my complete experience and tips...',
    author: 'Sarah Chen',
    country: 'USA',
    visaType: 'F1 Student',
    status: 'Approved',
    likes: 124,
    comments: 45,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'UK Student Visa Experience',
    content: 'The process of getting my UK student visa was quite straightforward...',
    author: 'John Smith',
    country: 'UK',
    visaType: 'Tier 4',
    status: 'Approved',
    likes: 98,
    comments: 32,
    createdAt: '2024-03-14'
  }
];

const visaDiscussions = [
  {
    id: '1',
    title: 'H1B Visa 2025 Timeline',
    content: 'Let\'s discuss the upcoming H1B visa timeline and preparation strategies...',
    author: 'Raj Patel',
    topic: 'Work Visa',
    likes: 89,
    comments: 32,
    createdAt: '2024-03-14'
  },
  {
    id: '2',
    title: 'Canada Study Permit Processing Time',
    content: 'Current processing times and what to expect...',
    author: 'Maria Garcia',
    topic: 'Student Visa',
    likes: 76,
    comments: 28,
    createdAt: '2024-03-13'
  }
];

const travelCompanions = [
  {
    id: '1',
    title: 'Looking for travel buddy - Europe Summer 2024',
    content: 'Planning a 2-week trip across Western Europe in July 2024...',
    author: 'Emma Wilson',
    destination: 'Europe',
    dates: 'July 2024',
    groupSize: 2,
    status: 'Open',
    likes: 56,
    comments: 23,
    createdAt: '2024-03-13'
  },
  {
    id: '2',
    title: 'Southeast Asia Backpacking Trip',
    content: 'Planning to explore Thailand, Vietnam, and Cambodia...',
    author: 'Alex Brown',
    destination: 'Southeast Asia',
    dates: 'September 2024',
    groupSize: 3,
    status: 'Open',
    likes: 45,
    comments: 19,
    createdAt: '2024-03-12'
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('experiences');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  // Get the current post type based on active tab
  const getCurrentPostType = () => {
    switch (activeTab) {
      case 'experiences':
        return 'experience';
      case 'discussions':
        return 'discussion';
      case 'companions':
        return 'companion';
      default:
        return 'experience';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: "${searchTerm}"`,
      });
    }
  };

  const handleLike = (id: string) => {
    toast({
      title: "Post liked",
      description: "You've liked this post",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Community Hub
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Share experiences, find travel companions, and get visa advice from the community
            </motion.p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search discussions, experiences, or travel companions..."
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Add Create Post Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">1,234+</div>
                <div className="text-gray-600">Visa Experiences</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">5,678+</div>
                <div className="text-gray-600">Active Discussions</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">890+</div>
                <div className="text-gray-600">Travel Companions</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveTab('experiences')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === 'experiences' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Visa Experiences
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === 'discussions' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Discussions
              </button>
              <button
                onClick={() => setActiveTab('companions')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === 'companions' 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Travel Companions
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Globe className="h-4 w-4" />
              <span>All Countries</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>
          </div>

          {/* List View */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'experiences' && (
              <div className="space-y-4">
                {visaExperiences.map(exp => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${exp.author}`}
                          alt={exp.author}
                          className="h-10 w-10 rounded-full bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{exp.author}</h3>
                          <p className="text-sm text-gray-500">{exp.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {exp.visaType}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          exp.status === 'Approved' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {exp.status}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{exp.title}</h2>
                    <p className="text-gray-600 mb-4">{exp.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(exp.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span>{exp.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <MessageSquare className="h-5 w-5" />
                          <span>{exp.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-gray-600 hover:text-gray-800">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="space-y-4">
                {visaDiscussions.map(disc => (
                  <motion.div
                    key={disc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${disc.author}`}
                          alt={disc.author}
                          className="h-10 w-10 rounded-full bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{disc.author}</h3>
                          <p className="text-sm text-gray-500">{disc.createdAt}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {disc.topic}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{disc.title}</h2>
                    <p className="text-gray-600 mb-4">{disc.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(disc.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span>{disc.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <MessageSquare className="h-5 w-5" />
                          <span>{disc.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-gray-600 hover:text-gray-800">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'companions' && (
              <div className="space-y-4">
                {travelCompanions.map(comp => (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${comp.author}`}
                          alt={comp.author}
                          className="h-10 w-10 rounded-full bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{comp.author}</h3>
                          <p className="text-sm text-gray-500">{comp.createdAt}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        comp.status === 'Open'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {comp.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{comp.title}</h2>
                    <p className="text-gray-600 mb-4">{comp.content}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{comp.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{comp.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Group Size: {comp.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => handleLike(comp.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span>{comp.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <MessageSquare className="h-5 w-5" />
                          <span>{comp.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-gray-600 hover:text-gray-800">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        type={getCurrentPostType()}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Community;
