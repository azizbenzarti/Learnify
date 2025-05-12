// src/components/About.jsx
import React from "react";

const About = () => {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            About Learnify
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transforming education through technology
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Learnify was founded in 2023 with a mission to bridge the gap
            between students and teachers through innovative digital solutions.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create accessible, engaging learning experiences that adapt to
              each student's needs while empowering educators with powerful
              tools.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              A world where quality education is personalized, interactive, and
              available to everyone regardless of location or background.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
