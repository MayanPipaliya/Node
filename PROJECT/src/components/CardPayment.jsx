import React from "react";
import { useNavigate } from "react-router-dom";

const CardPayment = () => {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    alert("💳 Payment Successful! And Order placed Successful!! ");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">


      <div
        className="fixed inset-0 bg-cover bg-repeat bg-fixed z-0 opacity-90"
        style={{ 
          backgroundImage: "url('/bg-food-pattern.jpg')",
        }}
      />

      <div className="fixed inset-0 bg-black opacity-80 z-0" />

      {/* 💳 Payment Form */}
      <form
        onSubmit={handlePayment}
        className="relative z-10 bg-black/50 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md text-white transition-all duration-300 hover:shadow-yellow-300 hover:scale-[1.02]"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100/80 p-4 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v1a4 4 0 004 4h4a4 4 0 004-4v-1c0-1.657-1.343-3-3-3s-3 1.343-3 3"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-yellow-400 mb-8 tracking-tight">
          Card Payment
        </h2>

        {/* Card Number */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all"
            placeholder="1234 5678 9012 3456"
          />
          <label className="absolute left-4 -top-3.5 bg-black/60 px-1 text-sm text-yellow-300 peer-focus:text-yellow-400 transition-all">
            Card Number
          </label>
        </div>

        {/* Expiry Date */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all"
            placeholder="MM/YY"
          />
          <label className="absolute left-4 -top-3.5 bg-black/60 px-1 text-sm text-yellow-300 peer-focus:text-yellow-400 transition-all">
            Expiry Date
          </label>
        </div>

        {/* CVC Code */}
        <div className="relative mb-6">
          <input
            type="text"
            required
            className="peer w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 transition-all"
            placeholder="3-digit code"
          />
          <label className="absolute left-4 -top-3.5 bg-black/60 px-1 text-sm text-yellow-300 peer-focus:text-yellow-400 transition-all">
            CVC Code
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-yellow-600 hover:shadow-yellow-400 transition-all duration-300 active:scale-95"
        >
          💳 Pay Securely
        </button>

        <p className="text-xs text-center text-white/70 mt-6">
          🔒 Your payment is SSL secured and encrypted.
        </p>
      </form>
    </div>
  );
};

export default CardPayment;
