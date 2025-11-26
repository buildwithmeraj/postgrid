"use client";

import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
});

const useAxiosSecure = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = session?.user?.accessToken;

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

        // Also handle network errors
        if (!error.response) {
          console.error("Network error:", error);
          return Promise.reject(error);
        }

        if (status === 401 || status === 403) {
          await signOut({ redirect: false });
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [session, router]);

  return instance;
};

export default useAxiosSecure;
