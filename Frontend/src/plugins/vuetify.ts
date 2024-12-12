import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#D51E30",
          secondary: "#00B0B8",
          gray: "#C5C2C0",
        },
      },
    },
  },
});
