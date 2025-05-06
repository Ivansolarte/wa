import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../../store/authStore";

export const Headers = () => {
  const { logout } = useAuthStore();
  const [menuMobil, setMenuMobil] = useState(false);

  const sessionClose = () =>{
    logout()
    sessionStorage.clear()
  }

  return (
    <header className="bg-white border-0.5 shadow-xl ">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <p className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/1011/1011579.png"
              alt=""
            />
          </p>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMenuMobil((state) => !state)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to={"/"} className="text-2xl font-semibold text-gray-900">
            Lista
          </Link>
          <Link
            to={"/graficas"}
            className="text-2xl font-semibold text-gray-900"
          >
           Resumen total
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <p
            className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-2xl"
            onClick={sessionClose}
          >
            Cerrar session <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </nav>

      {menuMobil && (
        <div className="lg:hidden z-40" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <p className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://cdn-icons-png.flaticon.com/512/1011/1011579.png"
                  alt=""
                />
              </p>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMenuMobil((state) => !state)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to={"/"}
                    onClick={()=>setMenuMobil(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Lista
                  </Link>
                  <Link
                    onClick={()=>setMenuMobil(false)}
                    to={"/graficas"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Resumen total
                  </Link>
                </div>
                <div className="py-6">
                  <p
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={sessionClose}
                  >
                    Cerrar session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
