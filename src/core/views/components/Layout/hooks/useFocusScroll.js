import { useLayoutEffect } from "react";

const useFocusScroll = (props = {}) => {
  const { anchor  = {}} = props;
  useLayoutEffect(() => {
    anchor?.current?.scrollIntoView?.({
      behavior: "smooth",
      inline: "nearest"
    });
  }, [anchor.current]);
};

export default useFocusScroll;
