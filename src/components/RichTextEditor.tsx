import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Quote
} from 'lucide-react';
import './RichTextEditor.css'; // आपकी कस्टम CSS

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing your blog content...',
  minHeight = 300
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.textContent !== value) {
      editorRef.current.textContent = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      // Get the plain text content, removing all HTML tags
      const plainText = editorRef.current.textContent || '';
      onChange(plainText);
    }
  };

  const handleBlur = () => {
    if (editorRef.current) {
      // On blur, get the plain text and update the state
      const plainText = editorRef.current.textContent || '';
      onChange(plainText);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const formatHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`);
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', title: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', title: 'Underline (Ctrl+U)' },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { icon: Link, action: insertLink, title: 'Insert Link' },
    { icon: Image, action: insertImage, title: 'Insert Image' },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote', title: 'Quote' }
  ];

  return (
    <div className="rich-text-editor">
      <div className="rte-toolbar">
        <div className="rte-toolbar-group">
          <select
            className="rte-heading-select"
            onChange={(e) => {
              if (e.target.value === 'p') {
                execCommand('formatBlock', 'p');
              } else {
                formatHeading(parseInt(e.target.value));
              }
              e.target.value = 'p';
            }}
            defaultValue="p"
          >
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
          </select>
        </div>
        <div className="rte-toolbar-separator"></div>
        <div className="rte-toolbar-group">
          {toolbarButtons.map((button, index) => {
            const IconComponent = button.icon;
            return (
              <button
                key={index}
                type="button"
                className="rte-toolbar-button"
                onClick={() => {
                  if (button.action) {
                    button.action();
                  } else if (button.command) {
                    execCommand(button.command, button.value);
                  }
                }}
                title={button.title}
              >
                <IconComponent size={16} />
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={editorRef}
        className="rte-content"
        contentEditable
        onInput={handleInput}
        onBlur={handleBlur}
        style={{ minHeight: `${minHeight}px` }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <div className="rte-footer">
        <span className="rte-char-count">
          {value.length} characters
        </span>
      </div>
    </div>
  );
};

export default RichTextEditor;