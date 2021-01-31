const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./lib/{pages,components}/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blueGray,
        secondary: colors.gray,
        tertiary: colors.yellow,
      },
      gridTemplateColumns: {
        deflist: '8em minmax(0, 1fr)'
      },
      borderWidth: {
        "1": "1px",
        "base": "1em",
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      minHeight: {
        "32": "8rem"
      },
      zIndex: {
        "behind": "-1000",
      },
      flex: {
        "0": "0 0 content"
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "even"],
    },
  },
  plugins: [],
};
