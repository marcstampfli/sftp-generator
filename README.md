# SFTP Config Generator

A modern and intuitive React application that allows users to easily generate `sftp.json` configuration files. With a clean UI/UX design, light/dark mode, multi-step form, and export options, this app simplifies creating SFTP configurations for VSCode and other tools.

![SFTP Config Generator Preview](preview.png)

## ✨ Features

- **Form Wizard:** Step-by-step multi-stage form for entering server settings, user credentials, and options.
- **Light/Dark Mode:** Beautiful light and dark themes with a toggle button to switch between them.
- **Intuitive UI/UX:** Modern, clean, and responsive layout with validation and helpful tooltips.
- **Show/Hide Password:** Easily toggle password visibility during entry.
- **Code-like JSON Output:** JSON output formatted with syntax highlighting and line numbers, designed to look like a code editor.
- **Download and Copy Options:** Save the generated JSON file or copy it to the clipboard directly.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/marcstampfli/sftp-config-generator.git
   cd sftp-config-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## 🛠 Usage

1. Launch the app and enter the necessary server settings, user credentials, and configuration options.
2. Use the **Generate SFTP JSON** button to create the configuration.
3. View the generated JSON output, which can be downloaded or copied to the clipboard.

## 📸 Screenshots

| Light Mode                               | Dark Mode                              |
| ---------------------------------------- | -------------------------------------- |
| ![Light Mode Screenshot](light-mode.png) | ![Dark Mode Screenshot](dark-mode.png) |

## 💡 Features to Add

- **User Authentication**: Ability to save and retrieve multiple configurations with user accounts.
- **Cloud Sync**: Option to sync generated configurations with cloud storage.
- **More Export Formats**: Support for other formats like YAML, XML.

## 📚 Technologies Used

- **React 18**: Modern frontend framework for building the UI
- **TypeScript**: For type-safe code and better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Icons**: Comprehensive icon library for intuitive UI
- **React Tooltip**: Informative tooltips for better UX
- **React Toastify**: Toast notifications for user feedback

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-tooltip": "^5.21.1",
    "react-toastify": "^9.1.3",
    "typescript": "^4.9.5",
    "tailwindcss": "^3.4.1"
  }
}
```

## 🌟 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- All contributors who help improve this project
