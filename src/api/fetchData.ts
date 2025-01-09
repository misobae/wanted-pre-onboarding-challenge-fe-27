type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
  token?: string;
};

export const fetchData = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const { method = "GET", headers, body } = options;
  const token = localStorage.getItem("token");

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Something went wrong");
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
