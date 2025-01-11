# Tavif AVIF/WEBP Converter App

This project is a lightweight and fast desktop application for converting images to AVIF/WEBP format, developed using the **Rust [Tauri framework](https://tauri.app/)** and **[Next.js](https://nextjs.org/)**.

## Features

- **Lightweight**: By using Tauri, the application's binary size is minimized.
- **Fast**: Utilizes Rust's performance for high-speed image conversion processing.
- **Intuitive UI**: A simple and user-friendly interface powered by Next.js.
- **Conversion to AVIF and WEBP**: Supports converting images in JPG, PNG, and WEBP formats to AVIF and WEBP formats.

## Screenshots

![screenshot](https://github.com/user-attachments/assets/f76f478f-1467-4c7a-a123-e3f9f74a62bb)

## Installation

You can install the application by following these steps:

### 1. Clone this repository:
   ```bash
   git clone https://github.com/harumiWeb/tavif.git
   cd tavif
   ```

### 2. Install dependencies:

  #### Next.js dependencies
  - Install the required packages.
   ```bash
   npm install
   ```

### 3. Start the development server:
   ```bash
   npm run tauri dev
   ```

## Build

To create a release build, run the following command:

   ```bash
   npm run tauri build
   ```

   - Once the build is complete, it will be generated in the `src-tauri/target/release/` directory.

## Usage

1. Launch the application.
2. Drag and drop the image files you want to convert.
3. Select the output format (AVIF or WEBP).
4. Click the "Convert" button to convert the images.

## Development Environment

- Frontend: Next.js
- Backend: Tauri (Rust)
- Language: TypeScript (Frontend), Rust (Backend)

## License

This project is licensed under the [MIT License](LICENSE).

## Developer

- Developer: harumiWeb
- Email: [halpost](https://www.halpost.tech/contact)
- GitHub: [harumiWeb](https://github.com/harumiWeb)
- X: [@HarumiWebDesign](https://x.com/HarumiWebDesign)

If you have any questions or feedback, feel free to create an issue!