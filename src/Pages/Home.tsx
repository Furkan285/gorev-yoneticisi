import React, { useState, useEffect } from 'react';
import { Todo } from '../Interfaces/Todo';
import { TodoForm } from '../Components/TodoForm';
import { TodoItem } from '../Components/TodoItem';

export const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('project_todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('project_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (title: string, category: Todo['category']) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleUpdate = (id: string, newTitle: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Görev Yönetim Paneli</h1>
          <p className="text-sm text-slate-500">React, TypeScript & LocalStorage ile CRUD Uygulaması</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-slate-400 py-8">Henüz görev eklenmedi. Yukarıdan yeni bir görev ekleyin.</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};