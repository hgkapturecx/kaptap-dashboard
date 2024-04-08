export const register = async (body) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const data = await fetch(
      `https://kaptap-backend.vercel.app/api/v1/register`,
      requestOptions
    );
    return data.json();
  } catch (error) {
    throw error;
  }
};


