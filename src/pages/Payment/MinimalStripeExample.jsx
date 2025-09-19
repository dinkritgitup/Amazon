import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51S7waNJQjs7u7i9G2mhzFL23dOPx8DLoafYnBttIl8y3XsizCzDqWoyD49KHrqfC8B2L1aQKTsnfPe8GXSJjdK8A00NvkKASP3');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    // For testing, just log the card element
    const card = elements.getElement(CardElement);
    console.log(card);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <CardElement onChange={handleChange} />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default function MinimalStripeExample() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
