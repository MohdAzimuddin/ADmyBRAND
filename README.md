
# ADmyBRAND AI Suite – Modern SaaS Landing Page 🚀

A beautifully crafted, responsive SaaS landing page for the fictional **ADmyBRAND AI Suite**, developed as part of the ADmyBRAND Coder Challenge. Built using **Next.js 14 App Router**, **Tailwind CSS**, and AI-driven development techniques.

📍 **Live Demo**: [ad-my-brand-azimuddin.vercel.app](https://ad-my-brand-azimuddin.vercel.app/)

---

## 📌 Project Overview

This landing page serves as a promotional website for an AI-powered marketing tool. The layout and design were carefully crafted with modern UX/UI principles, animation, and component reusability in mind. This submission is for **Task B: Modern SaaS Landing Page** from the ADmyBRAND challenge.

---

## ✨ Features

- ⚡ **Hero Section** – Attention-grabbing headline, subtext, and CTA
- 💡 **Features Grid** – 6 feature highlights with icons and copy
- 💸 **Pricing Section** – 3-tier responsive pricing cards with comparison features
- 💬 **Testimonials Carousel** – Customer feedback with avatars
- ❓ **FAQs Section** – Expandable accordions for common questions
- 📩 **Contact Form** – Fully working form with API route handler
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile
- 🧱 **Reusable Component System** – Cards, buttons, modals, and more
- 🎨 **Modern UI** – Built with Tailwind CSS, subtle animation, and clean layout

---

## 🛠 Tech Stack

| Tech               | Purpose                               |
|--------------------|----------------------------------------|
| **Next.js 14**     | App Router structure, routing          |
| **TypeScript**     | Type safety and DX                     |
| **Tailwind CSS**   | Utility-first modern styling           |
| **Framer Motion**  | Scroll-based animations (where used)   |
| **Vercel**         | Deployment                             |

---

## 📁 Folder Structure

Got it! Here's the corrected and **detailed folder structure** based on your actual project (from the ZIP file you uploaded), including all relevant files and sections to help reviewers or collaborators understand your architecture.

---

### 📁 **Folder Structure (Detailed)**

```
src/
├── app/                                 # Next.js App Router entry point
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                 # API handler for contact form
│   ├── layout.tsx                       # Root layout with HTML structure
│   ├── page.tsx                         # Main landing page
│   └── globals.css                      # Tailwind + global styling
│
├── components/                          # All custom React components
│   ├── ui/                              # Reusable UI elements
│   │   ├── accordion.tsx                # Accordion component (FAQ section)
│   │   ├── avatar.tsx                   # Avatar for testimonials
│   │   ├── badge.tsx                    # Badge/label component
│   │   ├── button.tsx                   # Custom button component
│   │   ├── card.tsx                     # Card layout (used in features, pricing, etc.)
│   │   ├── input.tsx                    # Input field component
│   │   ├── LoadingSpinner.tsx          # Loading spinner for async feedback
│   │   └── modal.tsx                    # Modal dialog component
│
│   ├── ContactForm.tsx                  # Contact form with validation
│   ├── FAQSection.tsx                   # Frequently Asked Questions section
│   ├── FeaturesSection.tsx             # Product features section
│   ├── Footer.tsx                       # Site footer with links and info
│   ├── Header.tsx                       # Top navigation/header bar
│   ├── HeroSection.tsx                  # Hero section with CTA
│   ├── PricingSection.tsx              # Pricing plans and comparison
│   └── TestimonialsSection.tsx         # Testimonials carousel
│
├── data/                                # Static content used in page sections
│   ├── faq.ts                           # FAQ questions/answers
│   ├── features.ts                      # List of product features
│   ├── pricing.ts                       # Pricing tier data
│   ├── testimonials.ts                  # Testimonials/reviews
│
├── lib/
│   └── utils.ts                         # Utility functions (e.g., email validation)
│
├── README.md                            # Project documentation (to be added)
└── tsconfig.json                        # TypeScript config (in root)
```

---

### 🔍 Summary of Structure

* **`app/`** → Handles routing and global layout/styling using App Router.
* **`components/`** → Modular React components; organized into:

  * `ui/` for atomic design system components
  * top-level feature-specific components
* **`data/`** → All content (features, pricing, testimonials, etc.) is stored as JS/TS modules.
* **`lib/`** → Utility functions for validation and helpers.
* **`api/contact/route.ts`** → Backend route using Next.js API for contact form submissions.


---

## 📄 AI Usage Report

### 🤖 AI Tools Used
- **Claude AI** – Ideation, structure planning, basic UI component prompts
- **DeepSeek** – TypeScript component generation, Tailwind layout scaffolding, form logic assistance

### 🧠 Sample Prompts Used
1. *"Generate a responsive SaaS landing page layout using Tailwind and Next.js App Router"*
2. *"Create a 3-tier pricing card section with hover animations and icons using TypeScript and Tailwind"*
3. *"Build a validated contact form with a serverless API handler in Next.js 14"*

### 🧮 AI vs Manual Work Breakdown
- **AI-assisted:** ~70%
  - Layout skeletons, UI sections, Tailwind styling
  - Functional components like accordion, modals, buttons
- **Manual work:** ~30%
  - Data structuring, layout tuning, form validation, visual polish
  - Folder organization and deployment

---

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/admybrand-ai-suite.git
cd admybrand-ai-suite
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment

This project is live and deployed via [Vercel](https://vercel.com/).

🔗 **Live Site:** [https://ad-my-brand-azimuddin.vercel.app/](https://ad-my-brand-azimuddin.vercel.app/)

---

## 📃 License & Credits

This project was built for the **ADmyBRAND AI Coder Hiring Challenge** and can be showcased in portfolios.

© 2025 Mohd Azeemuddin  
Email: [sfsuper2020@gmail.com](mailto:sfsuper2020@gmail.com)  
GitHub: [https://github.com/MohdAzimuddin](https://github.com/MohdAzimuddin)

---

## 🙌 Acknowledgments

Thanks to:

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Claude.ai](https://claude.ai/)
* [DeepSeek AI](https://deepseek.com/)
