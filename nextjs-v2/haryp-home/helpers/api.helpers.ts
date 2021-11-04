export const generateOptions = (type: "GET") => {
  switch (type) {
    case "GET":
      return {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
  }
};

export const getData = async <T>(url: string): Promise<T> => {
  return (await fetch(url, generateOptions("GET"))
    .then((response) => response.json())
    .catch((reason) => {
      console.error(reason);
    })) as T;
};
