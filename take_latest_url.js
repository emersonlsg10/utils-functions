// Calling the same request multiple times ?
// There's a solution.


let lastURLRef = "";
const verifyRepeatedURL = ({ url, params }) =>
  new Promise((resolve, reject) => {
    try {
      const serialiseUrl = () => {
        let key,
          keys = Object.keys(params);
        let count = keys.length;
        let mountedURL = url;
        while (count--) {
          key = keys[count];
          if (params[key]) {
            mountedURL += `${key}=${params[key]}`;
          }
        }
        return mountedURL;
      };

      const newURL = serialiseUrl();

      if (newURL === lastURLRef) {
        resolve(true);
      }

      lastURLRef = newURL;
      resolve(false);
    } catch {
      reject(false);
    }
  });

// This function block multiple Request to the same endpoint.
// Don't repeat the same action repeated times.

export const requestInterceptTakeLatest = async (callAPi, url, params = null) => {
  const isRepeated = await verifyRepeatedURL({ url, params });

  if (!isRepeated) {
    // callAPi
  }
  return { status: false };
};
