const NAMESPACE = "pi-pooh-wedding";
const NAME = "dog-treats";
const BASE = `https://api.counterapi.dev/v1/${NAMESPACE}/${NAME}`;

async function readCount(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`treat counter ${res.status}`);
  const data = await res.json();
  const n = Number(data?.count);
  if (!Number.isFinite(n)) throw new Error("invalid treat count");
  return n;
}

/** Shared public total — CounterAPI v1 (no backend of our own). */
export async function fetchTreatCount() {
  return readCount(`${BASE}/`);
}

export async function incrementTreatCount() {
  return readCount(`${BASE}/up`);
}
