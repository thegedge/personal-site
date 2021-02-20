const tailwindColors = require("tailwindcss/colors");

const colors = {
  primary: tailwindColors.blueGray,
  secondary: tailwindColors.gray,
  tertiary: tailwindColors.yellow,
};

let index = 0;
for (const [name, color] of Object.entries(tailwindColors)) {
  if (name != "black" && name != "white") {
    colors[`tag${index}`] = color;
    ++index;
  }
}

module.exports = {
  purge: {
    content: ["./{pages,lib}/**/*.{ts,tsx}", "_posts/**/*.md"],
    options: {
      safelist: {
        // standard: [/(text|bg)-tag\d+-\d+/],
      },
    },
  },
  theme: {
    extend: {
      colors,
      gridTemplateColumns: {
        deflist: "8em minmax(0, 1fr)",
      },
      borderWidth: {
        1: "1px",
        base: "1em",
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      minHeight: {
        32: "8rem",
        128: "32rem",
      },
      zIndex: {
        behind: "-1000",
      },
      flex: {
        0: "0 0 content",
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
