import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollToTopButton, { ScrollToTopOnRoute } from '../components/common/ScrollToTop';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnRoute />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default PublicLayout;
