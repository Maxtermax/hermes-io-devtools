import React, { useEffect, useState } from 'react';
import observers from "@observers/Settings";

export default function useSelector(context, value) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function selectItem() {
      const result = await observers.selector.notify({ context, value });
      setItem(result);
    }
    selectItem();
  }, [setItem, context, value]);
  return item;
}

