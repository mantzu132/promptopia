"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { data: session } = useSession();

  const isUserLoggedIn = Boolean(session);

  // PROVIDERS useEffect
  useEffect(() => {
    /**
     * Fetches providers from the server and sets them in the state.
     */
    const fetchProviders = async () => {
      // Send a request to the server to get the providers
      const response = await getProviders();
      // Set the providers in the state
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/*Logo*/}
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Promptopia logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/*Desktop navigation*/}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              {" "}
              Create Post{" "}
            </Link>
            <button onClick={() => signOut()} className="outline_btn">
              {" "}
              SignOut{" "}
            </button>
            <Link href={`/profile/${session.user.id}`}>
              <Image
                src={session?.user.image}
                alt={session.user.name}
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in ({provider.name})
                </button>
              ))}
          </>
        )}
      </div>
      {/*MOBILE NAVIGATION  */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex gap-3">
            <Image
              src={session?.user.image}
              alt={session.user.name}
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {/*DROPDOWN MENU */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {" "}
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  {" "}
                  Create prompt
                </Link>
                <button
                  className="black_btn  "
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/*MOBILE NAVIGATION END  */}
    </nav>
  );
};

export default Nav;
