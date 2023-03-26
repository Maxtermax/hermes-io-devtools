import { styled } from "@mui/material/styles";

export const InternalBar = styled("div")(({ theme }) => ({
  "@keyframes growAnimation ": {
    from: {
      height: "0%",
    },
    to: {
      height: "100%",
    },
  },
  animationName: "growAnimation",
  animationDuration: ".3s",
  animationFillMode: "forwards",
  animationTimingFunction: "ease-in-out",
  background: theme.palette.secondary.main,
  borderRadius: "5px",
  position: "absolute",
  top: "0px",
  left: "0px",
  height: "0%",
  width: "100%",
}));
