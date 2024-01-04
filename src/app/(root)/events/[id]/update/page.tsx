import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.action';

import React from 'react';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

export default async function UpdateEvent({
  params: { id },
}: UpdateEventProps) {
  const event = await getEventById(id);

  return (
    <>
      <section>
        <h3 className="wrapper">Update Event</h3>
      </section>
      <div className="wrapper my-8">
        <EventForm type="Update" event={event} />
      </div>
    </>
  );
}
