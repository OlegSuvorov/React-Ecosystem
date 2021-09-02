import { useState, useEffect } from 'react';

export const useFetch = (initialUrl: string, initialOptions = {}): any => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    url && fetchData();
  }, [url, options]);
  return ({data, error, isLoading, setUrl, setOptions});
};
