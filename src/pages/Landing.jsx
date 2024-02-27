import { useEffect, useState } from "react";
import logo from "../images/bynle-high-resolution-logo-black-transparent.png";
import { Link } from "react-router-dom";
import { createClient } from "pexels";

const client = createClient(
  "8728w89ndvoWyuaNJSmiq3ndkLkV7DjrQw2a2hHM4OfMg0ROUwoXmDeT"
);

export default function Landing() {
  const [photo1, setPhoto1] = useState({});
  const [photo2, setPhoto2] = useState({});
  const [photo3, setPhoto3] = useState({});
  const [photo4, setPhoto4] = useState({});
  const [photo5, setPhoto5] = useState({});

  useEffect(() => {
    client.photos.show({ id: 1105666 }).then((photo) => {
      setPhoto1({
        image: photo.src.original,
        alt: photo.url,
      });
    });
    client.photos.show({ id: 262524 }).then((photo) => {
      setPhoto2({
        image: photo.src.original,
        alt: photo.url,
      });
    });
    client.photos.show({ id: 2311713 }).then((photo) => {
      setPhoto3({
        image: photo.src.original,
        alt: photo.url,
      });
    });
    client.photos.show({ id: 332688 }).then((photo) => {
      setPhoto4({
        image: photo.src.original,
        alt: photo.url,
      });
    });
    client.photos.show({ id: 1438072 }).then((photo) => {
      setPhoto5({
        image: photo.src.original,
        alt: photo.url,
      });
    });
  }, []);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Bynle</span>
              <img className="h-14 w-auto" src={logo} alt="" />
            </a>
          </div>

          <div className="flex flex-1 justify-end">
            <Link
              to="/login"
              className="lg:text-sm font-semibold leading-6 text-gray-900 text-2xl"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="relative isolate">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    We’re changing the way students connect.
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    Welcome to Bynle, the ultimate platform for students to
                    connect with clubs and societies. Easily discover and attend
                    events, make new friends, and stay in the loop on your
                    academic community. Create an account, follow friends, and
                    dive into a world of shared interests and fun!
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      to="/register"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get started
                    </Link>
                    <Link
                      to="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Log in <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src={photo1.image}
                        alt={photo1.alt}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src={photo2.image}
                        alt={photo2.alt}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={photo3.image}
                        alt={photo3.alt}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src={photo4.image}
                        alt={photo4.alt}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src={photo5.image}
                        alt={photo5.alt}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg  object-left"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
