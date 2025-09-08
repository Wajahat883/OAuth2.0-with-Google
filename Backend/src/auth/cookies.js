export function setRefreshCookie(res, token) {
  res.cookie("refresh_Token", token, {
    httpOnly: true,
    secure: false, // ⚠️ true rakho agar https use kar rahe ho
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearRefreshTokenCookie(res) {
  res.clearCookie("refresh_Token");
}
