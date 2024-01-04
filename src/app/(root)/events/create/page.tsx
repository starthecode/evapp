import EventForm from '@/components/shared/EventForm';
import Popup from '@/components/shared/Popup';
import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import React from 'react';

export default function CreateEvent() {
  return (
    <>
      <section className="wrapper my-8">
        <div className="flex justify-between">
          <div>
            <h3 className="wrapper">Create Event</h3>
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div>
          <EventForm type="Create" />
        </div>
      </section>
    </>
  );
}
