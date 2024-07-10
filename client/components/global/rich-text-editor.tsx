import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FC } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
}
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link"],
  ],
};

const RichTextEditor: FC<RichTextEditorProps> = ({
  onChange,
  value,
  readOnly = false,
}) => {
  return (
    <div
      className={cn("border-b border-primary/30", {
        "border-none": readOnly,
      })}
    >
      <ReactQuill
        readOnly={readOnly}
        modules={!readOnly ? modules : { toolbar: null }}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RichTextEditor;
