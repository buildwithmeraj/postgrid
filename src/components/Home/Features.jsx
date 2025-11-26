"use client";

import React from "react";
import Link from "next/link";

import { Globe, ShieldCheck, TrendingUp, Users } from "lucide-react";

const featuresData = [
  {
    icon: <ShieldCheck size={36} className="text-primary" />,
    title: "Secure & Trusted",
    description:
      "All data is secured with JWT authentication and encrypted storage, ensuring your posts and issues remain safe.",
  },
  {
    icon: <TrendingUp size={36} className="text-primary" />,
    title: "Real-Time Updates",
    description:
      "Stay up-to-date with your posts and reported issues. Views and status are tracked in real-time.",
  },
  {
    icon: <Users size={36} className="text-primary" />,
    title: "Community Driven",
    description:
      "Engage with your community by sharing posts, reporting issues, and tracking solutions efficiently.",
  },
  {
    icon: <Globe size={36} className="text-primary" />,
    title: "Global Access",
    description:
      "Access the platform from anywhere and collaborate with users worldwide to solve issues faster.",
  },
];

const Features = () => {
  return (
    <section className="py-10 bg-base-100">
      <div className="mx-auto  text-center">
        <h2 className="text-4xl font-bold mb-6">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between max-w-md"
            >
              <div>
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-base-content/70 mb-4">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
