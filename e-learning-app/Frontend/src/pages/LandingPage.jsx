import { useRef } from "react";
import { Link } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";
import About from "../components/About";

export default function LandingPage() {
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToFeatures = (e) => {
    e.preventDefault();
    featuresRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    };
    
      const scrollToAbout = (e) => {
        e?.preventDefault();
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      };

  return (
    <div className="bg-white">
      <NavigationHeader
        scrollToFeatures={scrollToFeatures}
        scrollToAbout={scrollToAbout}
      />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background blobs */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Revolutionize Your Learning Experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learnify connects students and teachers in an interactive platform
              designed to make education engaging, accessible, and effective.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <button
                onClick={scrollToFeatures}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Learn smarter
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides tools for both students and teachers to
              create an optimal learning environment.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Interactive Courses",
                description:
                  "Engaging multimedia content designed for modern learners",
                icon: "🎯",
              },
              {
                name: "Progress Tracking",
                description:
                  "Real-time analytics to monitor your learning journey",
                icon: "📊",
              },
              {
                name: "Collaborative Tools",
                description:
                  "Work together with classmates and instructors seamlessly",
                icon: "👥",
              },
            ].map((feature) => (
              <div key={feature.name} className="rounded-xl bg-gray-50 p-8">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <About ref={aboutRef} />
    </div>
  );
}


