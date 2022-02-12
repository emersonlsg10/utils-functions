import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function usePersistedState(key = '', initialState = {}) {
  // exemplo de uso: const [theme, setTheme] = usePersistedState('key', initialValue = {});
  const [state, setState] = useState(null);

  useEffect(() => {
    async function fetchAsync() {
      const storage = await AsyncStorage.getItem(key);
      const storageParse = JSON.parse(storage);
      if (storageParse) {
        setState(storageParse);
      } else {
        setState(initialState);
      }
    }
    fetchAsync();
  }, []);

  const handleUpdateItemAsync = async () => {
    if (key !== '') {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    }
  };

  useEffect(() => {
    handleUpdateItemAsync();
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;