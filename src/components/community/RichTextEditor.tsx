import { useEffect, useRef, useState } from 'react';
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const formatDoc = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleKeyUp = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleAddLink = () => {
    if (linkUrl) {
      formatDoc('createLink', linkUrl);
      setIsLinkModalOpen(false);
      setLinkUrl('');
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      formatDoc('insertImage', imageUrl);
      setIsImageModalOpen(false);
      setImageUrl('');
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button onClick={() => formatDoc('bold')} className="p-2 rounded hover:bg-gray-200" type="button">
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc('italic')} className="p-2 rounded hover:bg-gray-200" type="button">
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc('insertUnorderedList')} className="p-2 rounded hover:bg-gray-200" type="button">
          <List className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc('insertOrderedList')} className="p-2 rounded hover:bg-gray-200" type="button">
          <ListOrdered className="h-4 w-4" />
        </button>
        <button onClick={() => setIsLinkModalOpen(true)} className="p-2 rounded hover:bg-gray-200" type="button">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button onClick={() => setIsImageModalOpen(true)} className="p-2 rounded hover:bg-gray-200" type="button">
          <ImageIcon className="h-4 w-4" />
        </button>
      </div>

      <div ref={editorRef} className="p-4 min-h-[200px] focus:outline-none" contentEditable onKeyUp={handleKeyUp} onBlur={handleKeyUp} />

      {/* link modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsLinkModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg" type="button">
                Cancel
              </button>
              <button onClick={handleAddLink} className="px-4 py-2 bg-gray-800 text-white rounded-lg" type="button">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* image modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Image URL</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsImageModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg" type="button">
                Cancel
              </button>
              <button onClick={handleAddImage} className="px-4 py-2 bg-gray-800 text-white rounded-lg" type="button">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;