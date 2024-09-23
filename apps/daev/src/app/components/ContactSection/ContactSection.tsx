// components/ContactSection/ContactSection.tsx
const ContactSection: React.FC = () => {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
          <form className="max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <input type="text" id="name" className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-2">Email</label>
              <input type="email" id="email" className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition">Send</button>
          </form>
        </div>
      </section>
    );
  };
  
  export default ContactSection;
  