import { IEvent } from '@/models/Event';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.action';

export default function Checkout({
  event,
  userId,
}: {
  event: IEvent;
  userId: string;
}) {
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [clientSecret, setClientSecret] = React.useState('');
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };
    await checkoutOrder(order);
  };

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <form action={onCheckout} method="post">
        <button className="btn-primary" type="submit" role="link">
          {event?.isFree ? 'Get Your Free Ticket' : 'Buy Ticket'}
        </button>
      </form>
    </>
  );
}
