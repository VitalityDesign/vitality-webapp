import axios from "axios";
import router from "@/router/index.js";

const http = axios.create({
  baseURL:
    (import.meta.env.DEV
      ? import.meta.env.VITE_BASE_URL
      : window.location.protocol + "//" + window.location.host) + "/api",
  timeout: 99999,
});

let isRefreshing = false;
let requestQueue = [];

http.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("access_token") || "";
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("响应拦截器", error);
    const { config, response } = error;
    if (!response) {
      return Promise.reject(error);
    }
    switch (response.status) {
      default:
        return Promise.reject(error);
      case 401:
        return Unauthorized(config);
      case 404: {
        response.statusText = `Server not found 404`;
        return Promise.reject(error);
      }
    }
  },
);

async function Unauthorized(config) {
  if (!config.url.endsWith("/login")) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ config, resolve });
      if (isRefreshing) {
        return;
      }
      isRefreshing = true;

      refreshToken()
        .then((res) => {
          for (const { config, resolve } of requestQueue) {
            resolve(http(config));
          }
          resolve(res);
        })
        .catch((err) => {
          const backUrl = encodeURIComponent(router.currentRoute.fullPath);
          router.push("/login?back=" + backUrl);
          reject(err);
        });

      isRefreshing = false;
      requestQueue = [];
    });
  }
}

const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    http
      .get("/refresh_token", {
        params: {
          access_token: localStorage.getItem("access_token"),
          refresh_token: localStorage.getItem("refresh_token"),
        },
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default http;
