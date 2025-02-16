import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left Section */}
        <p className="text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>

        {/* Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition duration-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <Linkedin size={20} />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
