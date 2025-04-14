

export const getRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.role; // Safely access role property
  } catch (e) {
    console.error("Token decoding error:", e);
    return null;
  }
};

export const isAuthenticated = (token) => {
  return !!token; // Simple check to see if token exists
};

export const getDecodedToken = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Token decoding failed:", e);
    return null;
  }
};

export const getIdFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?._id; // Safely access the id property
  } catch (e) {
    console.error("Token decoding error:", e);
    return null;
  }
};

