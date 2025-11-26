import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaFolderClosed } from "react-icons/fa6";

export default async function CategoriesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  const categories = await res.json();

  return (
    <div>
      <h2 className="">All Categories</h2>
      {categories.length < 1 ? (
        <p>No categories</p>
      ) : (
        <div className="flex justify-center">
          <Fade className="w-full max-w-sm md:max-w-md bg-base-100 border border-base-content/50 rounded-xl shadow p-6">
            <ul className="space-y-3 divide-y divide-base-content/50 lg:text-lg">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-2.5 text-body hover:text-secondary">
                    <FaFolderClosed />
                    <Link href={`/categories/${cat._id}`}>{cat.name}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      )}
    </div>
  );
}
