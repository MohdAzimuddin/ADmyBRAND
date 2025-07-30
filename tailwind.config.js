// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: '#ffffff',
//         foreground: '#000000',
//         muted: {
//           DEFAULT: '#f0f0f0',
//           50: '#f9f9f9',
//           100: '#f3f3f3',
//           200: '#e5e5e5',
//           300: '#d4d4d4',
//           400: '#a3a3a3',
//           500: '#737373',
//           600: '#525252',
//           700: '#404040',
//           800: '#262626',
//           900: '#171717',
//         },
//       },
//     },
//   },
//   plugins: [],
// };


// // /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Keep your custom variables for specific components
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         primary: {
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         secondary: {
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
        
//         // Add back the default Tailwind colors that your variables might be overriding
//         // This ensures colors like red-100, green-100, etc. work properly
//       },
//       // Don't override the default color palette completely
//     },
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    // Fixed paths to match your src/ structure
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Also include pages if you have them
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your brand colors using CSS variables
        'brand-primary': 'hsl(var(--brand-primary))',
        'brand-primary-foreground': 'hsl(var(--brand-primary-foreground))',
        'brand-primary-hover': 'hsl(var(--brand-primary-hover))',
        'brand-secondary': 'hsl(var(--brand-secondary))',
        'brand-secondary-foreground': 'hsl(var(--brand-secondary-foreground))',
        'brand-secondary-hover': 'hsl(var(--brand-secondary-hover))',
        'brand-accent': 'hsl(var(--brand-accent))',
        'brand-accent-foreground': 'hsl(var(--brand-accent-foreground))',
        'brand-accent-hover': 'hsl(var(--brand-accent-hover))',
        
        // Custom component colors
        'custom-background': 'hsl(var(--custom-background))',
        'custom-foreground': 'hsl(var(--custom-foreground))',
        'custom-muted': 'hsl(var(--custom-muted))',
        'custom-muted-foreground': 'hsl(var(--custom-muted-foreground))',
        'custom-border': 'hsl(var(--custom-border))',
        'custom-input': 'hsl(var(--custom-input))',
        'custom-ring': 'hsl(var(--custom-ring))',
        
        // Keep shadcn/ui compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      // Add your custom animations and other extensions
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}