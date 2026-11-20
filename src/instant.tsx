// lib/axios.ts

import axios from "axios";
import { redirect } from "react-router-dom";

export const axiosInstants = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstants.interceptors.request.use(async (config) => {
  const cookie = await cookieStore.get("access_token");

  if (cookie?.value) {
    config.headers.Authorization = `Bearer ${cookie.value}`;
  } else {
    redirect("/")
  }

  return config;
});