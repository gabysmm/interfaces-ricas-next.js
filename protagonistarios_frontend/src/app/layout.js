import './globals.css';
import Header from '../components/common/Header';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Protagonistarios - Personagens de Anime',
  description: 'Gerencie seus personagens de anime favoritos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="container">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}