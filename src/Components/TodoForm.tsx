import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Todo } from '../Interfaces/Todo';

interface TodoFormProps {
  onAdd: (title: string, category: Todo['category']) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Todo['category']>('Eğitim');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), category);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni bir görev yazın..."
        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Todo['category'])}
        className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Eğitim">Eğitim</option>
        <option value="İş">İş</option>
        <option value="Kişisel">Kişisel</option>
      </select>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition cursor-pointer"
      >
        <PlusCircle size={20} />
        <span>Ekle</span>
      </button>
    </form>
  );
};