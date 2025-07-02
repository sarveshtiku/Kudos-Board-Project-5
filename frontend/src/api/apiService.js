const API_BASE = "http://localhost:4000/api";

export async function createBoard(board, token) {
  const res = await fetch("http://localhost:4000/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(board),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create board");
  }
  return res.json();
}

export async function getMyProfile(token) {
  const res = await fetch("http://localhost:4000/api/user/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}

export async function getBoards(token, authorId) {
  let url = "http://localhost:4000/api/boards";
  if (authorId) url += `?authorId=${authorId}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}