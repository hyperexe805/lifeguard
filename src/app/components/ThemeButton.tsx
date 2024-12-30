import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Importar los iconos

const ThemeButton = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Usar useEffect para establecer el tema inicial cuando el componente se monta
  useEffect(() => {
    // Verifica el tema preferido del usuario al cargar la página
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'light';
    setTheme(savedTheme);
    // Aplica el tema al cargar el componente
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Guarda la preferencia del tema en localStorage

    // Alterna la clase en el body para cambiar el tema
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-4 flex justify-center items-center"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeButton;