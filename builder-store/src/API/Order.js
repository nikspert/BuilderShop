export async function createOrder({ Bearer, data }) {
  const response = await fetch("http://localhost:5000/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
