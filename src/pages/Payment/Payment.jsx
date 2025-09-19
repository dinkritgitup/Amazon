import React, { useContext, useState } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Components/Header/LayOut/LayOut';
import { DataContext } from '../../Components/Header/DataProvider/DataProvider';
import ProductCard from '../../Components/Header/Product/ProductCard';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/Header/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from "react-spinners";
import  {db} from "../../Utility/firebase"
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing,setProcessing] =useState(false)

  const handleChange = (e) => {
    e.error ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      console.log("Starting payment process...");
      console.log("Basket:", basket);
      console.log("Total:", total);

      // Check if basket is empty or total is 0
      if (!basket || basket.length === 0) {
        throw new Error("Your cart is empty");
      }

      if (total <= 0) {
        throw new Error("Total amount must be greater than 0");
      }

      // Step 1: Create payment intent
      const paymentAmount = Math.round(total * 100); // Ensure it's an integer
      console.log("Creating payment intent for total:", paymentAmount);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${paymentAmount}`,
      });

      console.log("Payment intent response:", response.data);
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("No client secret received from server");
      }

      // Step 2: Confirm card payment
      console.log("Confirming card payment...");
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error("Stripe payment error:", error);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log("Payment confirmed:", paymentIntent);

      // Step 3: Store order in Firestore
      console.log("Storing order in Firestore...");
      if (user && user.uid) {
        await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        dispatch({type: Type.EMPTY_BASKET});


        console.log("Order stored successfully");
      } else {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      setProcessing(false);
      console.log("Payment process completed successfully");

      // Step 4: Navigate to orders page
      navigate("/orders", { state: { msg: "You have placed a new order!" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "No email"}</div>
            <div>123 React Lane</div>
            <div>Addis Ababa</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>{
                  processing? (
                   <div className={classes.loading}>
                    <ClipLoader  color='gray' size={12}/>
                    <p>Please Wait ...</p>
                   </div>
                  ):" Pay Now"
                    }
                   
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
