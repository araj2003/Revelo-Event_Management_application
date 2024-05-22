import { useRef } from "react";
import "./Editor.css";
import { useState } from "react";

import JoditEditor from "jodit-react";

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className="editor">
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default Editor;
