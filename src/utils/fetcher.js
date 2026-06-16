export const fetcher = (url) =>
  fetch(`/api/v1${url}`).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });
