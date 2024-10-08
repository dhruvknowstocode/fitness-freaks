import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            message: '',
          });
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    let isValid = true;
    let errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { name, email, message } = formData;
      const subject = encodeURIComponent('Contact Form Submission');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
      const mailtoLink = `mailto:dhruvjain2424@gmail.com?subject=${subject}&body=${body}`;

      // Redirect to the mailto link
      window.location.href = mailtoLink;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 bg-gray-50 max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Contact Us</h2>
        <p className="text-base mb-8 text-gray-700 text-center">
          Get in touch with us for any questions or support. We are here to help you with any inquiries you may have.
        </p>
        {loading ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <form className="bg-white p-6 rounded-lg shadow-lg mx-auto mb-8" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Send Us a Message</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${formErrors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                placeholder="Your Name"
                required
              />
              {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${formErrors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                placeholder="Your Email"
                required
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-800 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${formErrors.message ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
              {formErrors.message && <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-4">
          <a
            href="mailto:support@fitnessapp.com"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Email Us
          </a>
          <a
            href="tel:+1234567890"
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
