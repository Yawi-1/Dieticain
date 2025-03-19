import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroImage from '../../public/HomeImage.jpg'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main
        className="flex-1 container mx-auto"
      >
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
