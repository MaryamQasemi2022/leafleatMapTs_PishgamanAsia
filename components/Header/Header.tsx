import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link href="/" className="navbar-brand">
            Pishgaman Asia
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  href="/"
                  className={pathName === "/" ? "nav-link active" : "nav-link"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/map"
                  className={
                    pathName === "/map" ? "nav-link active" : "nav-link"
                  }
                >
                  map
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => router.push("/auth/login")}
              >
                {" "}
                login{" "}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
