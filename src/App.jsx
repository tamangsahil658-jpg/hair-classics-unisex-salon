import React, { useState } from "react";
// Simple replacement components (no shadcn needed)
const Card = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>{children}</button>
);


export default function SalonWebsite() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Haircut",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const WHATSAPP_NUMBER = "916297286281"; // Primary WhatsApp number // Replace with salon WhatsApp number (country code + number, no +)
  const RAZORPAY_KEY = "rzp_test_XXXXXXXXXXXX"; // Replace with your Razorpay Key ID

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      key: RAZORPAY_KEY,
      amount: 500, // 500.00 INR booking advance (change as needed, amount in paise)
      currency: "INR",
      name: "Hair Classic Unisex Salon",
      description: `Advance for ${form.service}`,
      handler: function (response) {
        const message = `Hello Hair Classic Unisex Salon,%0A%0AI have paid the booking advance.%0A%0APayment ID: ${response.razorpay_payment_id}%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0ADate: ${form.date}%0ATime: ${form.time}%0A%0AThank you.`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, "_blank");
      },
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      theme: {
        color: "#f97316",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Floating WhatsApp Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/916297286281"
          target="_blank"
          className="bg-green-500 hover:scale-110 transition transform text-white px-4 py-3 rounded-full shadow-2xl text-sm font-semibold"
        >
          💬 WhatsApp 1
        </a>
        <a
          href="https://wa.me/916295493606"
          target="_blank"
          className="bg-green-500 hover:scale-110 transition transform text-white px-4 py-3 rounded-full shadow-2xl text-sm font-semibold"
        >
          💬 WhatsApp 2
        </a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/70 border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Hair Classic Logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-600" />
            <h1 className="text-xl md:text-2xl font-bold tracking-wide text-orange-400">HAIR CLASSIC UNISEX SALON</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#services" className="hover:text-blue-400 transition">Services</a>
            <a href="#gallery" className="hover:text-blue-400 transition">Gallery</a>
            <a href="#booking" className="hover:text-blue-400 transition">Book Now</a>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-black/80" />
        <div className="relative z-10 max-w-3xl px-6">
          <h2 className="text-5xl font-extrabold mb-6">
            Welcome to <span className="text-blue-600">Style & Confidence</span>
          </h2>
          <p className="text-gray-300 mb-8">Trendy cuts, vibrant colors, and premium grooming.</p>
          <a href="#booking">
            <Button className="relative px-10 py-5 text-xl rounded-2xl font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 animate-pulse">
              ✨ Book Your Look ✨
            </Button>
          </a>
        </div>
      </section>

      {/* Services with playful cards */}
      <section id="services" className="py-20 px-6 bg-white text-black">
        <h3 className="text-4xl font-bold text-center mb-14 text-blue-600">Our Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["Haircut ✂️", "Hair Coloring 🎨", "Beard Styling 🧔", "Facial ✨", "Hair Spa 💆", "Bridal Makeup 👰"].map((service) => (
            <Card key={service} className="rounded-3xl shadow-xl hover:-translate-y-3 hover:shadow-2xl transition duration-300">
              <div className="p-8 text-center">
                <h4 className="text-2xl font-semibold">{service}</h4>
              </div>
            </Card>
          ))}
        </div>
      </section>

      

      {/* Booking */}
      <section id="booking" className="py-20 px-6">
        <h3 className="text-4xl font-bold text-center text-blue-600 mb-10">Book Appointment</h3>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white text-black p-8 rounded-3xl shadow-2xl space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded-xl" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full p-3 border rounded-xl" required />
          <select name="service" value={form.service} onChange={handleChange} className="w-full p-3 border rounded-xl">
            <option>Haircut</option>
            <option>Hair Coloring</option>
            <option>Beard Styling</option>
            <option>Facial</option>
            <option>Hair Spa</option>
            <option>Bridal Makeup</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 border rounded-xl" required />
            <input type="time" name="time" value={form.time} onChange={handleChange} className="p-3 border rounded-xl" required />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl">Pay & Book</Button>
        </form>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 bg-blue-600 text-white">
        <h3 className="text-4xl font-bold text-center text-white mb-14">Happy Clients</h3>
        <div className="flex gap-6 overflow-x-auto px-6">
       {["Fantastic service!", "Loved the ambience!", "Highly professional staff!", "Best salon in town!"].map((text, i) => (
  <div key={i} className="min-w-[250px] rounded-3xl shadow-xl bg-white text-black p-6">
    <p>“{text}”</p>
  </div>
))}

  
        </div>
        <p className="text-center mt-10 font-bold text-lg tracking-wide">Call Now: 6295493606 | 6297286281</p>
      </section>

      <footer className="text-center py-6 border-t border-blue-500/30">
        © {new Date().getFullYear()} Hair Classic Unisex Salon
      </footer>
    </div>
  );
}



