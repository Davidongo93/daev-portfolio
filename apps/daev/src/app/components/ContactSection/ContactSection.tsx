import CodeExample from "../CodeExample/CodeExample";
import IconBar from "../IconBar/IconBar";

// components/ContactSection/ContactSection.tsx
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="text-white bg-black opacity-90 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Formulario de Contacto */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Contact</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg mb-2 text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg mb-2 text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg mb-2 text-white">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Message"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition">
                  Send
                </button>
              </div>
            </form>
              <IconBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
