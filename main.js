// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";

const createWindow = () => {
  const iconPath =
    process.platform === "darwin"
      ? path.join(__dirname, "favicon.icns")
      : path.join(__dirname, "favicon.ico");

  if (fs.existsSync(iconPath)) {
    // Icon found at: ${iconPath}
  } else {
    console.error(`Icon not found at: ${iconPath}`);
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "Foldering App",
    icon: iconPath,
    show: false, // Don't show until ready
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
      backgroundThrottling: false,
    },
  });

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win.show();
    
    // Remove automatic dev tools opening
    // if (isDev) {
    //   win.webContents.openDevTools();
    // }
  });

  if (isDev) {
    win.loadURL("http://localhost:5173").catch((err) => {
      console.error("Failed to load dev server:", err);
    });
  } else {
    const filePath = path.join(__dirname, "renderer", "build", "index.html");
    // Loading file: ${filePath}
    win
      .loadFile(filePath)
      // File loaded successfully
      .catch((err) => console.error("Failed to load file:", err));
  }

  return win;
};

app.whenReady().then(() => {
  // Enable app launch optimization
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
  app.commandLine.appendSwitch('disable-web-security');
  app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
  
  ipcMain.handle("ping", () => "pong");
  createWindow();
  
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
