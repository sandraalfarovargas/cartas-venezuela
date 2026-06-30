import crypto from "crypto";

export const SESSION_COOKIE = "cv_session";

// Genera el valor "secreto" que se guarda en la cookie cuando el login es correcto.
export function expectedSessionToken() {
  return crypto
    .createHash("sha256")
    .update(`${process.env.MODERATION_PASSWORD}:${process.env.SESSION_SECRET}`)
    .digest("hex");
}

export function isCorrectPassword(password) {
  return password === process.env.MODERATION_PASSWORD;
}

export function hasValidSession(cookieValue) {
  return Boolean(cookieValue) && cookieValue === expectedSessionToken();
}
