export interface Todo {
  id: string;
  title: string;
  category: 'İş' | 'Kişisel' | 'Eğitim';
  completed: boolean;
  createdAt: string;
}