import './globals.css';
import Header from '../components/common/Header';

export const metadata = {
  title: 'Protagonistarios - Personagens de Anime',
  description: 'Gerencie seus personagens de anime favoritos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}