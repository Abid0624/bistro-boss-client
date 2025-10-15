import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  // console.log(totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log("ClientSecret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("❌ Payment Intent Error:", err));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Stripe:", stripe, "Elements:", elements);
    // console.log("ClientSecret at submit:", clientSecret);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    // 1. Create Payment Method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      // console.log(" Payment Method Error:", pmError.message);
      setError(pmError.message);
      return;
    } else {
      console.log("✅ Payment Method:", paymentMethod);
      setError("");
    }

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

      if (paymentResult.error) {
        // Payment failed
        console.log("Payment Error:", paymentResult.error.message);
        setError(paymentResult.error.message);
      } else if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        // Payment succeeded
        console.log(" Payment Successful!", paymentResult.paymentIntent);
        if (paymentResult.paymentIntent.status === "succeeded") {
          // console.log("transaction id", paymentResult.paymentIntent.id);
          setTransactionId(paymentResult.paymentIntent.id);
          // now save the payment in the database
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentResult.paymentIntent.id,
            date: new Date(), // utc date server.use moment js to convert
            cartIds: cart.map((item) => item._id),
            menuItemIds: cart.map((item) => item.menuId),
            status: "pending",
          };
          const res = await axiosSecure.post("/payment", payment);
          console.log("payment saved", res.data);
          refetch();
          if (res.data?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your payment is successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/paymentHistory");
          }
        }
        setError(""); // clear any previous error
      }
    } catch (err) {
      console.log("Exception in confirmCardPayment:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-primary my-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your transaction id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
