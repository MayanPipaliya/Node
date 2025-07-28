import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const initialProducts = [
    {
      id: 1,
      name: "Grilled Vegetable",
      desc: "Grilled vegetables are a healthy, flavorful dish made by marinating.",
      price: 150,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=e6d7cc377248fe674e4d7f58616437538632e2d9-3861735-images-thumbs&n=13",
    },
    {
      id: 2,
      name: "French Fries",
      desc: "Thinly sliced or stick-shaped potatoes deep-fried until golden.",
      price: 120,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=1e1a10263da564693149214adfccdfb6309cb02f-5092559-images-thumbs&n=13",
    },
    {
      id: 3,
      name: "Fried Chicken",
      desc: "Chicken pieces coated in seasoned batter and deep-fried.",
      price: 200,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=72118dd72f5cf4f47c3ec214d580263c2c9dbd83-5873671-images-thumbs&n=13",
    },
    {
      id: 4,
      name: "Burger",
      desc: "A sandwich with a patty placed inside a bun.",
      price: 180,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=6b005eb5824494500ab8c9c0cbb0892c21a8bb72-5341800-images-thumbs&n=13",
    },
    {
      id: 5,
      name: "Paneer Makhani",
      desc: "A rich curry with paneer cubes in tomato-based gravy.",
      price: 190,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=371dbb5d4c49d4dfcdefe5d440a82eb02d7e8d93-9236689-images-thumbs&n=13",
    },
    {
      id: 6,
      name: "Pizza",
      desc: "Flat dough topped with sauce, cheese, and toppings.",
      price: 220,
      count: 0,
      image: "https://avatars.mds.yandex.net/i?id=d03440d91b91ac52f156917e5bd7ebb2cd5542f5-5490022-images-thumbs&n=13",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderType, setOrderType] = useState("");
  const [showDeliveryTimePopup, setShowDeliveryTimePopup] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const handleCounter = (id, opr, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              count:
                opr === "+"
                  ? product.count + value
                  : Math.max(0, product.count - value),
            }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const totalPrice = products.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );
  const totalCount = products.reduce((acc, item) => acc + item.count, 0);

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === "Delivery") {
      setShowDeliveryForm(true);
    } else {
      setShowDeliveryForm(false);
    }
  };

  const handlePurchase = () => {
    if (!(totalCount >= 1 && orderType && paymentMethod)) {
      setShowPopup(true);
      return;
    }

    if (orderType === "Delivery") {
      const { name, phone, address } = deliveryForm;
      if (!name || !phone || !address) {
        alert("Please fill in all delivery details.");
        return;
      }
    }

    if (paymentMethod === "Card") {
      navigate("/card-payment");
    } else {
      const time = Math.floor(Math.random() * 30) + 10; // 10 to 40 min
      setDeliveryTime(time);
      setShowDeliveryTimePopup(true);
    }
  };

  const handleDeliveryInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="fixed inset-0 bg-center bg-repeat z-0" style={{ backgroundImage: "url('/bg-food-pattern.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-80" />
      </div>

      <main className="relative z-10 font-sans text-white py-10 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-12 drop-shadow-lg">🍽️ Food Ordering</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-600 rounded-3xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-black/40 backdrop-blur-sm">
              <img src={product.image} alt={product.name} className="rounded-t-2xl w-full h-60 object-cover" />
              <div className="mt-4 px-6 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-300">{product.desc}</p>
                </div>
                <p className="text-base font-medium text-green-400 ml-4 whitespace-nowrap">₹{product.price}</p>
              </div>

              <div className="flex justify-between items-center m-5">
                <div className="flex items-center gap-3">
                  <button className="text-xl font-bold" onClick={() => handleCounter(product.id, "-", 1)}>−</button>
                  <span className="text-xl font-bold">{product.count}</span>
                  <button className="text-xl font-bold" onClick={() => handleCounter(product.id, "+", 1)}>+</button>
                </div>
                <button onClick={() => handleDelete(product.id)} className="text-red-400 text-sm font-medium hover:text-red-500 hover:underline transition">Delete</button>
              </div>

              {product.count > 0 && (
                <p className="text-right text-sm text-gray-400 m-3">SubTotal: ₹{product.count * product.price}</p>
              )}
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <section className="mt-16 p-8 rounded-3xl border border-gray-600 max-w-3xl mx-auto shadow-2xl bg-black/40 backdrop-blur-sm">
            {totalPrice > 0 && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-400">💰 Total: ₹{totalPrice}</h2>
                <p className="text-sm text-gray-300 mt-1">You're just one step away from deliciousness!</p>
              </div>
            )}

            {/* Order Type */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                <span className="text-xl">📦</span> Order Type
              </h3>
              <div className="flex flex-wrap gap-6">
                {["Dining", "Delivery", "Takeaway"].map((type) => (
                  <label key={type} className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      orderType === type
                        ? "bg-yellow-100 text-black border-yellow-400 font-semibold"
                        : "border-gray-400 text-gray-200 hover:border-yellow-300"
                    } cursor-pointer transition`}>
                    <input
                      type="radio"
                      name="orderType"
                      value={type}
                      checked={orderType === type}
                      onChange={() => handleOrderTypeChange(type)}
                      className="accent-yellow-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Address Form */}
            {showDeliveryForm && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                  <span className="text-xl">🏠</span> Delivery Address
                </h3>
                <div className="space-y-4">
                  <input
                    name="name"
                    value={deliveryForm.name}
                    onChange={handleDeliveryInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300"
                  />
                  <input
                    name="phone"
                    value={deliveryForm.phone}
                    onChange={handleDeliveryInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300"
                  />
                  <textarea
                    name="address"
                    value={deliveryForm.address}
                    onChange={handleDeliveryInputChange}
                    placeholder="Delivery Address"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300"
                  />
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                <span className="text-xl">💳</span> Payment Method
              </h3>
              <div className="flex flex-wrap gap-6">
                {["UPI", "Card", "Cash on Delivery", "Cash"].map((method) => (
                  <label key={method} className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      paymentMethod === method
                        ? "bg-yellow-100 text-black border-yellow-400 font-semibold"
                        : "border-gray-400 text-gray-200 hover:border-yellow-300"
                    } cursor-pointer transition`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-yellow-500"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handlePurchase}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Confirm Purchase
              </button>
            </div>
          </section>
        )}

        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white/90 text-black p-6 rounded-2xl shadow-2xl border border-red-300 w-[90%] max-w-sm">
              <p className="text-lg font-semibold text-red-600 mb-4">
                Please select at least one item, order type, and payment method.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 px-6 py-2 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showDeliveryTimePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white text-black rounded-2xl shadow-2xl p-8 w-[90%] max-w-md border-2 border-green-500">
              <h2 className="text-xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h2>
              <p className="text-base mb-2">Your food will arrive in approximately</p>
              <p className="text-2xl font-extrabold text-green-700 mb-4">{deliveryTime} minutes</p>
              <button
                onClick={() => setShowDeliveryTimePopup(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Order;
