// src/components/community/RichTextEditor.tsx

import { useRef, useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

const RichTextEditor = ({ content, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const formatDoc = (command, value = "") => {
    document.execCommand(command, false, value);
    onChange(editorRef.current?.innerHTML || "");
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="border border-gray-300 rounded">
      <div className="flex gap-2 p-2 bg-gray-50 border-b">
        <button onClick={() => formatDoc("bold")} className="p-2 hover:bg-gray-200 rounded">
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc("italic")} className="p-2 hover:bg-gray-200 rounded">
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc("insertUnorderedList")} className="p-2 hover:bg-gray-200 rounded">
          <List className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc("insertOrderedList")} className="p-2 hover:bg-gray-200 rounded">
          <ListOrdered className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc("createLink", prompt("Enter URL"))} className="p-2 hover:bg-gray-200 rounded">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button onClick={() => formatDoc("insertImage", prompt("Enter Image URL"))} className="p-2 hover:bg-gray-200 rounded">
          <ImageIcon className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="p-4 min-h-[150px] focus:outline-none"
        placeholder="Write something..."
      />
    </div>
  );
};

export default RichTextEditor;