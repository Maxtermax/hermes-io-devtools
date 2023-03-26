export function resolvePromise(promise) {
  return new Promise((resolve) => {
    promise
      .then((result) => resolve({ ok: true, error: null, result }))
      .catch((error) => resolve({ error, ok: false, result: null }));
  });
}
