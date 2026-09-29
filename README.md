# Nitish Singh | Developer Portfolio

A modern, fully responsive and animated personal portfolio website built with **HTML5, CSS3, and vanilla JavaScript**. No frameworks, no build step, just open and run.

🔗 **Live Demo:** [your-portfolio-link.vercel.app](https://your-portfolio-link.vercel.app)

![Portfolio Preview](Outputs/Screenshot 2026-09-30 001946.png)

---

## ✨ Features

- **Fully responsive**: mobile-first design that works on phones, tablets, and desktops
- **Dark / light mode** toggle, with the choice saved in `localStorage`
- **Typing effect** in the hero section
- **Scroll-reveal animations** using the Intersection Observer API
- **Animated counters** and **skill progress bars** that fill as you scroll
- **Glassmorphism UI** with gradient accents, hover lift, and glow effects
- **Project cards** with tech tags, live and GitHub links
- **Education and achievements timeline**
- **Validated contact form** with inline error and success messages
- **Preloader**, sticky navbar with active-link highlight, and back-to-top button
- **Accessible and SEO-friendly**: semantic HTML, ARIA labels, meta and Open Graph tags
- Respects `prefers-reduced-motion`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure |
| CSS3 | Layout (Grid/Flexbox), variables, animations, responsiveness |
| JavaScript (ES6+) | Interactivity, animations, theme toggle, form validation |
| Google Fonts | Poppins and Inter typography |
| Font Awesome | Icons |

---

## 📂 Project Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── profile.jpg
    │   ├── preview.png
    │   ├── campusmart.png
    │   ├── gramconnect.png
    │   └── examcraft.png
    └── resume.pdf
```

---

## 🚀 Getting Started

### Prerequisites
A modern web browser. Optionally, [VS Code](https://code.visualstudio.com/) with the **Live Server** extension for auto-reload.

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/Shubh6392/portfolio.git

# 2. Move into the project folder
cd portfolio

# 3. Open index.html in your browser
#    or start Live Server in VS Code (right-click index.html → Open with Live Server)
```

---

## 🎨 Customization

1. **Personal info**: edit the name, bio, and links in `index.html`.
2. **Profile photo**: replace `assets/images/profile.jpg` with your own image.
3. **Resume**: replace `assets/resume.pdf` with your latest resume.
4. **Projects**: update titles, descriptions, tech tags, screenshots, and links in the Projects section.
5. **Skills**: change the `data-percent` values on the skill bars in `index.html`.
6. **Colors and fonts**: change the CSS variables at the top of `style.css`:

   ```css
   :root {
     --primary: #7c3aed;
     --accent: #06b6d4;
     --bg: #0b0f1a;
     --text: #e5e7eb;
   }
   ```

7. **Contact form**: the form is a front-end demo by default. To receive real messages, connect [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/) in `script.js`.

---

## 🌐 Deployment

### GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and the `/ (root)` folder, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Netlify / Vercel
1. Sign in and choose **Add new site → Import from Git**.
2. Select the repository. No build command is needed, and the publish directory is the root (`/`).
3. Deploy.

---

## 📁 Featured Projects

| Project | Description | Tech | Links |
|---------|-------------|------|-------|
| **CampusMart** | MERN-based marketplace where students buy and sell products within their campus | React.js, Tailwind CSS, Node.js, Express.js | [Live](https://campus-mart-nine.vercel.app/) |
| **GramConnect** | Digital complaint management system with role-based access for users and admins | React.js, Tailwind CSS, Node.js, MongoDB | [GitHub](https://github.com/Shubh6392/GramConnect) |
| **ExamCraft** | Online examination system with timed tests, auto-submission, and instant results | React.js, Tailwind CSS, MongoDB | [GitHub](https://github.com/Shubh6392) |

---

## 📈 Performance Goals

- Lighthouse score of **90+** in Performance, Accessibility, Best Practices, and SEO
- Optimized images (WebP or compressed) and animations using only `transform` and `opacity`

---

## 📬 Contact

**Nitish Singh** | Full Stack Developer & Salesforce Developer

- 📧 Email: [shubhsingh6392@gmail.com](mailto:shubhsingh6392@gmail.com)
- 💼 LinkedIn: [nitish-singh-a5a1b2312](https://linkedin.com/in/nitish-singh-a5a1b2312)
- 🐙 GitHub: [Shubh6392](https://github.com/Shubh6392)
- ⚔️ Codeforces: [Nitish15](https://codeforces.com/profile/Nitish15)
- 🍴 CodeChef: [nitish6392](https://www.codechef.com/users/nitish6392)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE). Feel free to use it as inspiration for your own portfolio, and a credit or star ⭐ is always appreciated.

---

<p align="center">Made with ❤️ by Nitish Singh</p>
