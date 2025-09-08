import { useState } from "react";
import axios from "axios";

export default function TaskCard({ task, onUpdate }) {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleClick = (field) => {
    setEditingField(field);
    setTempValue(task[field]);
  };

  const handleBlurOrEnter = async (field) => {
    if (tempValue !== task[field]) {
      const updatedTask = { ...task, [field]: tempValue };
      await onUpdate(updatedTask); // chama o update API do Home.jsx
    }
    setEditingField(null);
  };

  return (
    <div className="task-card">
      <span
        className={`task-title ${editingField === "nome" ? "editing" : ""}`}
        contentEditable={editingField === "nome"}
        suppressContentEditableWarning
        onClick={() => handleClick("nome")}
        onBlur={() => handleBlurOrEnter("nome")}
        onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter("nome")}
      >
        {editingField === "nome" ? tempValue : task.nome}
      </span>

      <span
        className={`task-desc ${editingField === "descricao" ? "editing" : ""}`}
        contentEditable={editingField === "descricao"}
        suppressContentEditableWarning
        onClick={() => handleClick("descricao")}
        onBlur={() => handleBlurOrEnter("descricao")}
        onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter("descricao")}
      >
        {editingField === "descricao" ? tempValue : task.descricao}
      </span>
    </div>
  );
}
