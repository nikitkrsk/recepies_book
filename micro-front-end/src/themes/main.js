import { lightBlue, red } from "@material-ui/core/colors";

export const themesConfig = {
  legacy: {
    palette: {
      type: "light",
      primary: {
        light: "#ECECEE",
        main: "#3543D0",
        dark: "#161EB3",
      },
      secondary: {
        light: lightBlue[400],
        main: lightBlue[600],
        dark: lightBlue[700],
        contrastText: lightBlue[800],
      },
      background: {
        paper: "#FFFFFF",
        default: "#F7F7F7",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: lightBlue[300],
      },
    },
    status: {
      danger: "orange",
    },
  },
  light1: {
    palette: {
      type: "light",
      primary: {
        light: "#b3d1d1",
        main: "#006565",
        dark: "#003737",
      },
      secondary: {
        light: "#ffecc0",
        main: "#FFBE2C",
        dark: "#ff9910",
        contrastText: "#272727",
      },
      background: {
        paper: "#FFFFFF",
        default: "#F0F7F7",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#FFBE2C",
      },
    },
    status: {
      danger: "orange",
    },
  },

  light5: {
    palette: {
      type: "light",
      primary: {
        light: "#C2C7F1",
        main: "#FFFFFF",
        dark: "#161EB3",
      },
      secondary: {
        light: "#B3F1FE",
        main: "#EF4E17",
        dark: "#00B2FC",
        contrastText: "#1E1F23",
      },
      background: {
        paper: "#F9F9F9",
        default: "#F7FAFF",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#606060",
      },
    },
    status: {
      danger: "orange",
    },
  },
  light12: {
    palette: {
      type: "light",
      primary: {
        light: "#FFFAF6",
        main: "#FFEDE2",
        dark: "#FFE0CF",
      },
      secondary: {
        light: "#DBD8F7",
        main: "#887CE3",
        dark: "#584CD0",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#FFFFFF",
        default: "#FCF8F5",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#757A8D",
      },
    },
    status: {
      danger: "orange",
    },
  },
  dark1: {
    palette: {
      type: "dark",
      primary: {
        light: "#C2C2C3",
        main: "#323338",
        dark: "#131417",
      },
      secondary: {
        light: "#B8E1D9",
        main: "#129B7F",
        dark: "#056D4F",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#262526",
        default: "#1E1D1E",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#129B7F",
      },
    },
    status: {
      danger: "orange",
    },
  },
  dark3: {
    palette: {
      type: "dark",
      primary: {
        light: "#C2C8D2",
        main: "#354968",
        dark: "#16213A",
      },
      secondary: {
        light: "#F4CFCA",
        main: "#D55847",
        dark: "#C03325",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#23354E",
        default: "#1B2A3F",
      },
      error: red,
    },
    status: {
      danger: "orange",
    },
  },
  dark7: {
    palette: {
      type: "dark",
      primary: {
        light: "FFECC5",
        main: "#FEBE3E",
        dark: "#FD991B",
      },
      secondary: {
        light: "#FFC8C7",
        main: "#c7c7c7", //
        dark: "#FD201F",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#2A2E32",
        default: "#212529",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#FFFFFF",
      },
    },
    status: {
      danger: "orange",
    },
  },
  dark9: {
    palette: {
      type: "dark",
      primary: {
        light: "#BCC8CD",
        main: "#204657",
        dark: "#0B202C",
      },
      secondary: {
        light: "#B3EBC5",
        main: "#00BD3E",
        dark: "#00981B",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#1C1E27",
        default: "#15171E",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#00BD3E",
      },
    },
    status: {
      danger: "orange",
    },
  },
};

export default themesConfig;
