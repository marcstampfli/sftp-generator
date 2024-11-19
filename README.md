# SFTP Generator

A modern and intuitive React + TypeScript application for generating and managing SFTP configurations. Built with a beautiful UI/UX design, this app features a multi-step form wizard, profile management, and dark/light mode support. Perfect for developers who need to manage multiple SFTP configurations for VSCode or other tools.

![SFTP Generator Preview](preview.png)

## ✨ Features

- **Multi-step Form Wizard:** Intuitive step-by-step process for creating SFTP configurations
- **Profile Management:** Save, load, and delete SFTP configuration profiles
- **Light/Dark Mode:** Beautiful light and dark themes with smooth transitions
- **Authentication Options:** Support for both password and key-based authentication
- **Advanced Configuration:** Customize host, port, path mappings, and more
- **Real-time Validation:** Input validation with helpful error messages
- **JSON Preview:** Live preview of the generated configuration with syntax highlighting
- **Modern UI/UX:** Clean, responsive layout built with Tailwind CSS
- **Type Safety:** Built with TypeScript for robust code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/marcstampfli/sftp-generator.git
   cd sftp-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🛠 Usage

1. **Create a New Configuration:**
   - Fill out the multi-step form with your SFTP server details
   - Choose between password or key-based authentication
   - Configure additional options like path mappings

2. **Save and Manage Profiles:**
   - Save your configurations as profiles for quick access
   - Load existing profiles to modify settings
   - Delete profiles you no longer need

3. **Export Configuration:**
   - Preview the generated JSON configuration
   - Copy to clipboard or download as a file
   - Use in your VSCode or other SFTP-compatible tools

## 🔧 Project Structure

```
sftp-generator/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI components
│   │   ├── forms/          # Form components and steps
│   │   ├── profile/        # Profile management
│   │   └── output/         # JSON output components
│   ├── services/           # SFTP and utility services
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and Tailwind config
├── server/                 # Backend server for SFTP operations
└── public/                 # Static assets
```

## 💻 Technologies

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Icons
  - React Hook Form

- **Backend:**
  - Node.js
  - Express
  - SSH2 (for SFTP operations)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and TypeScript teams for the amazing development experience
- Tailwind CSS team for the utility-first CSS framework
- All contributors who help improve this project
