import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, message } = formData;
  
    if (!name || !email || !message) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/contacts', {  // Corrected the endpoint URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Something went wrong. Please try again.');
        return;
      }
  
      setSubmitted(true);
  
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white ">
      {/* Left side - Space-themed image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1539321908154-04927596764d?q=80&w=1200')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="absolute inset-0 flex flex-col justify-between z-20 p-12">
          <div className="flex items-center">
            <div className="bg-[#FDB827] rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl"></span>
            </div>
            <span className="ml-3 text-white font-bold text-2xl">ORBITRA</span>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 max-w-md">
              Have questions about our cosmic explorations? Our team of space enthusiasts is ready to assist you on your journey through the universe.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#FDB827] rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-200">orbitra@space.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#FDB827] rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-200">+962 - 7777 44 11</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#FDB827] rounded-full p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-200">Jordan , Zarqa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Contact form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>
          </div>
          
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded mb-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21209C]"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21209C]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21209C]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="h-4 w-4 text-[#21209C] border-gray-300 rounded focus:ring-[#21209C]"
                />
                <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-700">
                  Keep me updated on space exploration news and events
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FDB827] hover:bg-[#F26B0F]/90 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-md"
              >
                Send Message
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting this form, you agree to our <a href="#" className="text-[#21209C] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#21209C] hover:underline">Terms of Service</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
