import { jwtDecode } from "jwt-decode";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/config";

export const authUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe to the listener after first invocation
        if (user && user.emailVerified) {
          resolve({ status: true, email: user.email }); // Resolve the Promise with authentication status
        } else {
          resolve({ status: false }); // Resolve the Promise with authentication status
        }
      },
      (error) => {
        console.error("Error checking authentication:", error);
        reject(error); // Reject the Promise if there's an error
      }
    );
  });
};

export const getUserFromToken = (token) => {
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
  return null;
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("email");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return true;
    }
  }
  return false;
};
