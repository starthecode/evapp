'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

import { redirect } from 'next/navigation';

export default function Login() {
  const [loader, setLoader] = React.useState<boolean>(false);
  const session = useSession();

  React.useEffect(() => {
    if (session?.status === 'authenticated') {
      redirect('/');
    }
  });

  //   const [form, setForm] = useState({ email: '', password: '' });

  const loginUser = async () => {
    setLoader(true);
    //@ts-ignore
    await signIn('google', null, { redirect: false, prompt: 'login' });
    // await signIn('azure-ad', null, {
    //   redirect: true,
    //   prompt: 'login',
    //   callbackUrl: '/dashboard',
    // });
  };

  return (
    <>
      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&amp;>div]:min-h-[calc(100vh-80px)]">
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className="w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            <div className="mb-5 px-6 pt-3 text-left md:pt-0 lg:px-0 lg:text-start">
              <h2 className="mb-5 font-bold text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl">
                Welcome back! Please
                <span className="relative inline-block">
                  Sign in to{' '}
                  <svg
                    viewBox="0 0 147 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36"
                  >
                    <path
                      className="fill-[#f1672b]"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M62.4325 0.957703C55.5264 1.2859 48.7014 1.68945 42.0459 2.13063C32.6242 2.75474 23.2063 3.40038 13.8451 4.42263C10.8984 4.74545 7.90595 4.94989 4.97767 5.35341C3.13948 5.60628 0.702089 5.96671 0.382211 6.04203C0.214902 6.08507 0.141911 6.1497 0.118325 6.17122C-0.0475096 6.32187 -0.0172508 6.46707 0.0763539 6.58006C0.113943 6.62848 0.208995 6.74689 0.472857 6.76303C18.1192 7.86599 36.1635 5.71388 53.8312 5.48791C84.4702 5.10053 116.038 6.63929 146.433 9.99658C146.699 10.0235 146.957 9.88894 146.994 9.68987C147.038 9.49618 146.846 9.30786 146.581 9.28096C116.134 5.91829 84.5144 4.37415 53.8165 4.76691C37.3509 4.97674 20.5603 6.86525 4.07184 6.21962C4.45068 6.16582 4.82217 6.112 5.16122 6.06357C8.0777 5.66005 11.0576 5.461 13.9925 5.13818C23.3338 4.11593 32.7326 3.4703 42.1417 2.85157C53.8165 2.07681 65.9998 1.40965 78.279 1.0976C82.6718 1.14602 87.0498 1.19446 91.4278 1.25364C100.899 1.38277 110.414 1.75939 119.863 2.26514C122.708 2.42117 125.553 2.58256 128.398 2.72245C129.341 2.77087 131.774 2.91073 132.113 2.89997C132.533 2.88921 132.614 2.63098 132.621 2.58794C132.643 2.4911 132.629 2.35658 132.422 2.2436C132.4 2.22745 132.267 2.17362 131.973 2.14134C114.792 0.236721 96.4471 -0.0806646 78.2937 0.376658C59.1453 0.177588 39.9232 0.0914646 20.8234 0C20.55 0 20.3266 0.161432 20.3244 0.360502C20.323 0.559572 20.5433 0.721008 20.8168 0.726389C34.6467 0.790952 48.5466 0.855478 62.4325 0.957703Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>{' '}
                continue.
              </h2>
              <p className="leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 md:pb-6 xl:gap-5 xl:pb-7">
              <button
                disabled={loader}
                onClick={loginUser}
                className="bg-[#0a70c5] border-0 py-2 w-full rounded-md flex justify-center items-center text-white text-md"
              >
                {loader ? (
                  <div className="flex gap-2">
                    <span>loading..</span>
                    <span> Signin...</span>
                  </div>
                ) : (
                  <span className="flex gap-2">
                    <svg
                      id="fi_2111483"
                      fill="white"
                      enableBackground="new 0 0 24 24"
                      height="25"
                      viewBox="0 0 24 24"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m21.823 9h-2.187v2.177h-2.177v2.187h2.177v2.177h2.187v-2.177h2.177v-2.187h-2.177z"></path>
                      <path d="m7.5 19.5c4.328 0 7.203-3.038 7.203-7.326 0-.491-.051-.87-.122-1.248h-7.08v2.578h4.257c-.174 1.095-1.289 3.233-4.257 3.233-2.557 0-4.645-2.118-4.645-4.737s2.087-4.738 4.645-4.738c1.463 0 2.435.624 2.988 1.156l2.036-1.954c-1.311-1.227-2.999-1.964-5.025-1.964-4.144 0-7.5 3.356-7.5 7.5s3.356 7.5 7.5 7.5z"></path>
                    </svg>
                    Signin with Google
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden w-7/12 items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16">
          <div className="pb-8 pt-5 text-center 2xl:block 2xl:w-[1063px]">
            <div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg">
              <h2 className="rizzui-title-h2 mb-5 font-semibold !leading-normal lg:text-[26px] 2xl:px-10 2xl:text-[32px]">
                The simplest way to manage your workspace.
              </h2>
              <p className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint velit officia consequat duis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
