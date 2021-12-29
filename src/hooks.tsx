import { SetStateAction, useState, useEffect } from "react";

export function usePersistentState(
  key: string,
  defaultValue: string
): [string, React.Dispatch<SetStateAction<string>>] {
  const initialValue =
    localStorage.getItem(`TONYS_LIST_${key}`) || defaultValue;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(`TONYS_LIST_${key}`, value);
  });

  return [value, setValue];
}
