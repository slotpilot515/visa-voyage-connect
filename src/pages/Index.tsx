
import { motion } from 'framer-motion';
import { MessageSquare, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Welcome to Global Travel Hub
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Your one-stop platform for visa information, travel tips, and finding companions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => navigate('/community')}
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Community
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover a community of travelers sharing experiences, advice, and opportunities to connect</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <img 
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=visa"
                  alt="Visa Experiences"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Visa Experiences</h3>
              <p className="text-gray-600 mb-4">Learn from real experiences shared by travelers who've successfully obtained visas for various destinations.</p>
              <button
                onClick={() => navigate('/community')} 
                className="text-gray-700 font-medium flex items-center justify-center gap-1 mx-auto hover:text-gray-900"
              >
                <span>Explore Visa Stories</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Travel Discussions</h3>
              <p className="text-gray-600 mb-4">Join active discussions about travel destinations, visa processes, and get advice from experienced travelers.</p>
              <button
                onClick={() => navigate('/community')} 
                className="text-gray-700 font-medium flex items-center justify-center gap-1 mx-auto hover:text-gray-900"
              >
                <span>Join Discussions</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Travel Companions</h3>
              <p className="text-gray-600 mb-4">Find like-minded travelers to join your adventures or join existing travel groups for your next destination.</p>
              <button
                onClick={() => navigate('/community')} 
                className="text-gray-700 font-medium flex items-center justify-center gap-1 mx-auto hover:text-gray-900"
              >
                <span>Find Companions</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to join our community?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">Connect with travelers from around the world, share your experiences, and make your next trip memorable.</p>
          <button
            onClick={() => navigate('/community')}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Join Community
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Global Travel Hub</h2>
              <p className="text-gray-400 mt-2">Your passport to seamless travel experiences</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Global Travel Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
