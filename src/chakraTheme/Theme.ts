import { extendTheme, theme } from "@chakra-ui/react";
const colors = {
  "main-color-bg": "#2c2c38",
  "accent-color": "#645fc6",
  "gray-color": "#8a8e9b",
  "main-dark-bg": "#21212d",
  "creame-white": "#fdfeff",
};

const fonts = {
  heading: "Poppins",
  body: "Poppins",
};

export default extendTheme({
  ...theme,
  colors,
  fonts,
});
