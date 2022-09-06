export default function makeRequest({ url }: { url: string }) {
  return fetch(url);
}
