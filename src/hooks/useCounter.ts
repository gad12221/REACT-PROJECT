import { useState } from "react";

const useCounter = () => {
  //hooks ca use built-in/custom hooks:
  const [count, setCount] = useState(0);

  return { count, setCount }
}