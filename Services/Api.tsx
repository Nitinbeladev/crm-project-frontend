import axios from "axios"

const Api = axios.create({
  baseURL: "https://crm-backend-dl7i.onrender.com/",
  withCredentials: true,
});

// / ---------------- REQUEST INTERCEPTOR ---------------- / /
  Api.interceptors.request.use(
    (config) => {
      console.log("interceptor", "request");
      // console.log("📤 Request:", config.url, config.method);

      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );

// ---------------- RESPONSE INTERCEPTOR ---------------- //
Api.interceptors.response.use(
  
  (response) => {
    console.log(response)
    return response
  },

  async (error) => {
     console.log("interceptor", "request");
    const originalRequest = error.config;

    // If access token expired → backend returns 403
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("retying api...")

      try {
        // Call refresh token API
        const res = await Api.post(
          "refresh",
          {},
          { withCredentials: true }
        );
      console.log("responserefresh",res)
        const newToken = res.data.data;
         console.log(res)
        // Store new access token
        localStorage.setItem("accessToken", newToken);

        // Retry the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return Api(originalRequest);
      } catch (err) {
        console.log("Refresh token expired. Logging out...");
       
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        // OPTIONAL: redirect to login page
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const callApi = async(url: string, method = "get", body ?: any)=> {
 try {
      const res = await Api({
      url,
      method,
      data : body,
    });
    return res.data
 } catch (error : any) {
    // console.error("API Error:", error.response || error.message);
    throw error;
 }
}



