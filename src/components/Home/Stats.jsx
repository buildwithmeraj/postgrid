"use client";

import React from "react";
import { Users, ClipboardList, Eye, Sparkles } from "lucide-react";
import "animate.css";

const statsData = [
  {
    icon: <Users className="text-primary w-10 h-10" />,
    value: "1,250",
    desc: "Active users on platform",
  },
  {
    icon: <ClipboardList className="text-primary w-10 h-10" />,
    value: "3,480",
    desc: "Total posts created",
  },
  {
    icon: <Eye className="text-primary w-10 h-10" />,
    value: "12,540",
    desc: "Total post views",
  },
  {
    icon: <Sparkles className="text-primary w-10 h-10" />,
    value: "10+",
    desc: "New posts daily",
  },
];

export default function Stats() {
  return (
    <section className="py-8 flex items-center flex-col justify-center">
      <h2 className="text-3xl font-bold text-center mb-10">Our Stats</h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow rounded-xl bg-base-100 animate__animated animate__infinite animate__slow	 animate__pulse">
        {statsData.map((stat, index) => (
          <div key={index} className="stat w-sm text-center py-4">
            <div className="stat-title flex items-center gap-2 justify-center">
              {stat.icon}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-desc">
              <span>{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
