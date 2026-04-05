import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
   
            <p className="text-gray-400 leading-relaxed font-light">
              Crafting digital excellence with a touch of luxury. We turn complex ideas into seamless experiences.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {['Fb', 'Tw', 'Ig', 'Be'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-xs hover:bg-white hover:text-black transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Luxury Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium">Get in Touch</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li>123 Luxury Lane, Suite 456<br />New York, NY 10001</li>
              <li>+1 (555) 000-1234</li>
              <li>hello@floka.design</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium">Join the Club</h4>
            <p className="text-gray-400 text-sm">Subscribe for exclusive updates and early access.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-white transition-colors font-light"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-sm uppercase tracking-widest font-bold text-yellow-500 hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-900 flex flex-col md:row items-center justify-between gap-6 text-xs text-gray-500 tracking-widest uppercase">
          <p>© 2026 FLOKA. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;