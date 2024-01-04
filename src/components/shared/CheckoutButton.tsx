'use client';
import { IEvent } from '@/models/Event';
import { useSession } from 'next-auth/react';
import React from 'react';
import Checkout from './Checkout';

export default function CheckoutButton({ event }: { event: IEvent }) {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const closedEvent = new Date(event.endDateTime) < new Date();

  return (
    <div className="block items-center gap-3">
      {closedEvent ? (
        <p className="p-2 text-red-400">Sorry, this event has been closed</p>
      ) : (
        <>
          {session ? (
            <Checkout event={event} userId={userId} />
          ) : (
            <span>Please login, to buy</span>
          )}
        </>
      )}
    </div>
  );
}
