'use client';
import { eventFormSchema } from '@/lib/validator';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { eventDefaultValues } from '@/constants';

import Dropdown from './Dropdown';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/event.action';
import { useSession } from 'next-auth/react';
import { IEvent } from '@/models/Event';

type EventFormProps = {
  type: 'Create' | 'Update';
  event?: IEvent;
};

type FormData = z.infer<typeof eventFormSchema>;

export default function EventForm({ type, event }: EventFormProps) {

  const { data: session } = useSession();

  const userId = session?.user?.id as string;
  const [files, setFiles] = React.useState<File[]>([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const router = useRouter();

  const initialValues =
    event && type === 'Update'
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const onInvalid = (errors: any) => console.error(errors);

  async function onSubmit(data: FormData) {
    //Create
    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...data },
          userId,
          path: '/profile',
        });
        if (newEvent) {
          reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //Update
    if (type === 'Update') {
      if (!event?._id) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...data, _id: event?._id },
          path: `/events/${event?.id}`,
        });
        if (updatedEvent) {
          reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <input
            {...register('title', { required: true })}
            placeholder="Event title"
            name="title"
            className="input-field"
          />
          {errors?.title && (
            <p className="text-red-600 text-sm">{errors?.title?.message}</p>
          )}

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Dropdown onChangeHandler={field.onChange} value={field.value} />
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <textarea
            {...register('desc', { required: true })}
            placeholder="Description"
            name="desc"
            className="textarea rounded-2xl"
          />
          {errors?.desc && (
            <p className="text-red-600 text-sm">{errors?.desc?.message}</p>
          )}
          {/* <FileUploader
            onFieldChange={field.onChange}
            imageUrl={field.value}
            setFiles={setFiles}
          /> */}
          {errors?.title && (
            <p className="text-red-600 text-sm">{errors?.title?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/location-grey.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            <input
              {...register('location', { required: true })}
              name="location"
              placeholder="Event location or Online"
              className="input-field"
            />
            {errors?.location && (
              <p className="text-red-600 text-sm">
                {errors?.location?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
            <Controller
              control={control}
              name="startDateTime"
              render={({ field }) => (
                <DatePicker
                  onChange={(date: Date) => field.onChange(date)}
                  selected={field.value}
                  showTimeSelect
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  wrapperClassName="datePicker"
                />
              )}
            />
          </div>

          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
            <Controller
              control={control}
              name="endDateTime"
              render={({ field }) => (
                <DatePicker
                  name="endDateTime"
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  showTimeSelect
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  wrapperClassName="datePicker"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-slate-200 px-4 py-2">
            <Image
              src="/assets/icons/dollar.svg"
              alt="dollar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <input
              {...register('price')}
              name="price"
              type="number"
              placeholder="Price"
              className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            =
            <div className="flex items-center">
              <label
                htmlFor="isFree"
                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Free Ticket
              </label>
              <input
                {...register('isFree')}
                name="isFree"
                type="checkbox"
                id="isFree"
                className="mr-2 h-5 w-5 border-2 border-primary-500"
              />
            </div>
          </div>

          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/link.svg"
              alt="link"
              width={24}
              height={24}
            />

            <input
              {...register('url')}
              name="url"
              placeholder="URL"
              className="input-field"
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 col-span-2 w-fit p-2 rounded-md text-white"
          >
            {isSubmitting ? 'Submitting...' : `${type} Event `}
          </button>
        </div>
      </form>
    </>
  );
}
