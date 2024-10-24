# SFTP Config Generator

A modern and intuitive React application that allows users to easily generate `sftp.json` configuration files. With a clean UI/UX design, light/dark mode, multi-step form, and export options, this app simplifies creating SFTP configurations for VSCode and other tools. Users can create, save, and manage multiple server profiles, making it an efficient solution for managing SFTP configurations across different environments.

![SFTP Config Generator Preview](https://github.com/marcstampfli/sftp-generator/blob/master/public/preview.png)

## ✨ Features

### Completed Features
- **Form Wizard**: Step-by-step multi-stage form for entering server settings, user credentials, and options.
- **Real-Time Validation**: Inline field validation ensures correct input data.
- **Light/Dark Mode**: Beautiful light and dark themes with user preference saved in local storage.
- **Show/Hide Password**: Easily toggle password visibility during entry.
- **Generated JSON Output**: JSON output formatted with syntax highlighting and line numbers, designed to look like a code editor.
- **Download and Copy Options**: Save the generated JSON file as `sftp.json` or copy it to the clipboard directly.
- **Profile Management**: Create, save, and load multiple SFTP profiles to manage different server configurations.
- **Responsive UI/UX**: Modern, clean, and optimized layout for both large and small screens, with validation and helpful tooltips.
- **Tooltips for Input Fields**: Guidance for users on input fields to make the form more intuitive.
- **Accessibility Improvements**: ARIA labels and full keyboard navigation for an accessible user experience.

### Upcoming Features
- **Synchronization Options**: Support for sync commands (upload, download, mirror) as per SFTP plugin capabilities.
- **Multi-Workspace Support**: Manage configurations for multiple projects or workspaces from a single interface.
- **Advanced Connection Settings**: Add options like `privateKeyPath`, `passphrase`, `keepaliveInterval`, and `keepaliveCountMax`.
- **Connection Testing**: Test SFTP connection settings directly from the form.
- **Profile Import/Export**: Allow users to import/export server profiles in bulk.
- **User Authentication**: Ability to save and retrieve multiple configurations with user accounts.
- **Cloud Sync**: Option to sync generated configurations with cloud storage.
- **More Export Formats**: Support for other formats like YAML and XML.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

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

   The app should now be running at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## 🛠 Usage

1. Launch the app and enter the necessary server settings, user credentials, and configuration options.
2. Use the **Generate SFTP JSON** button to create the configuration.
3. View the generated JSON output, which can be downloaded or copied to the clipboard.
4. Save your profile for future use.

## 📸 Screenshots

| Light Mode                               | Dark Mode                              |
| ---------------------------------------- | -------------------------------------- |
| ![Light Mode Screenshot](https://github.com/marcstampfli/sftp-generator/blob/master/public/light-mode.png) | ![Dark Mode Screenshot](https://github.com/marcstampfli/sftp-generator/blob/master/public/dark-mode.png) |

## 📚 Technologies Used

- **React**: Frontend framework for building the UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Icons**: Beautiful icons used for intuitive UI.
- **Prism.js**: Syntax highlighting for JSON output.
- **React Toastify**: Toast notifications for user feedback.

## 🌟 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to the open-source community for providing tools like React, Tailwind CSS, and Prism.js.

## 📧 Contact

For any questions or suggestions, feel free to reach out:

- **Email**: [marcstampfli@gmail.com](mailto:marcstampfli@gmail.com)
- **GitHub**: [marcstampfli](https://github.com/marcstampfli)

---

Thank you for checking out **SFTP Config Generator**! If you find this useful, please star the repository 🌟 and share it with others!
