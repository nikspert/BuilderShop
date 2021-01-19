export const requestHandler = async (request, setFormState, params) => {
  setFormState("loading");
  let result = await request(params);
  if (!result.success) throw new Error("Server request failed");
  setFormState("success");
  return result;
};

export const getFormData = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
};

export function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args);
  };
}
