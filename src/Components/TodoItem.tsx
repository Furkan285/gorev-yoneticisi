import React, { useState } from 'react';
import { Trash2, Edit3, Check, X, CheckCircle2, Circle } from 'lucide-react';
import { Todo } from '../Interfaces/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const badgeColors = {
    Eğitim: 'bg-blue-100 text-blue-700',
    İş: 'bg-amber-100 text-amber-700',
    Kişisel: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={() => onToggle(todo.id)} className="text-indigo-600 hover:scale-110 transition cursor-pointer">
          {todo.completed ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Circle size={22} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-2 py-1 border border-indigo-400 rounded focus:outline-none"
            autoFocus
          />
        ) : (
          <div className="flex flex-col">
            <span className={`font-medium ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {todo.title}
            </span>
            <span className="text-xs text-slate-400">{todo.createdAt}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[todo.category]}`}>
          {todo.category}
        </span>

        {isEditing ? (
          <>
            <button onClick={handleSave} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer" title="Kaydet">
              <Check size={18} />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer" title="İptal">
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer" title="Güncelle">
              <Edit3 size={18} />
            </button>
            <button onClick={() => onDelete(todo.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer" title="Sil">
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};