import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useTemperature = () => {
  const isFahrenheit: boolean = useSelector(({ ui }) => ui.isFahrenheit);
  const degree = isFahrenheit ? "℉" : "℃";

  const temperature = useCallback(
    (temperature: number) =>
      Math.round(isFahrenheit ? temperature * 1.8 + 32 : temperature),
    [isFahrenheit]
  );

  return [degree, temperature] as const;
};
