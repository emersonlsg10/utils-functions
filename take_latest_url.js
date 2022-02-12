// Calling the same request multiple times ?
// There's a solution.

import React, { useRef } from "react";

const lastPageRef = useRef("");
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

      if (newURL === lastPageRef?.current) {
        resolve(true);
      }

      lastPageRef.current = newURL;
      resolve(false);
    } catch {
      reject(false);
    }
  });

export const requestInterceptTakeLatest = async (callAPi, url, params = null) => {
  const isRepeated = await verifyRepeatedURL({ url, params });

  if (!isRepeated) {
    // callAPi
  }
  return { status: false };
};
