// import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold text-purple-300">Nari</h4>
          <p className="mt-2 text-sm">
            For our fierce warriors and their never diminishing light
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-purple-300">SOCIAL MEDIA</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/Rashid-123/Nari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/shadan-rashid/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Linkedin
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/rashid._29/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-4 flex justify-between items-center">
        <p className="text-sm">© Copyright 2024</p>
        <div className="flex space-x-4 text-white">
          <a
            href="https://www.instagram.com/rashid._29/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-gray-400 cursor-pointer" />
          </a>
          <a
            href="https://x.com/Rashid1505"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-gray-400 cursor-pointer" />
          </a>
          <a
            href="https://github.com/Rashid-123/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-gray-400 cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/in/shadan-rashid/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-gray-400 cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
