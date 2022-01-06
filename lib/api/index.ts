export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getInfo() {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/info`)
    .then((res) => res.json())
    .catch((res) => res.text());
}