'use client';
import { formatDateTime } from '@/lib/utils';
import { IEvent } from '@/models/Event';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardPropsType = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

export default function Card({
  event,
  hasOrderLink,
  hidePrice,
}: CardPropsType) {
  const { data: session } = useSession();
  const isEventCreator = session?.user?.id === event.organizer?._id.toString();

  return (
    <div className="group relative flex flex-col bg-white shadow rounded-sm">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url('/assets/event_img.jpg')` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 w-full h-[200px]"
      />

      {/* IS EVENT CREATOR ... */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          {/* <DeleteConfirmation eventId={event._id} /> */}
        </div>
      )}
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event?.category?.name}
            </p>
          </div>
        )}

        <p className="text-sm text-slate-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="font-normal text-sm text-slate-400">
            {event.organizer.name}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
