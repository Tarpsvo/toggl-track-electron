const { app, BrowserWindow, session, Menu } = require("electron");
const fs = require("fs");

const BLOCKED_URLS = [
  "intercom",
  "clarity",
  "firebase",
  "heapanalytics",
  "analytics.google",
  "google.ee",
  "linkedin",
  "googleads",
  "bing.",
  "licdn.com",
  "googletagmanager",
  "sentry.com",
];

const createWindow = () => {
  const win = new BrowserWindow({
    title: "Toggl Track",
    width: 1000,
    height: 768,
    titleBarStyle: "hiddenInset",
    vibrancy: "appearance-based",
    movable: true,
  });

  win.loadURL("https://track.toggl.com");
  win.setTitle("Toggl Track");

  const css = fs.readFileSync("./override.css", { encoding: "utf-8" });
  win.webContents.on("did-navigate", (event) => {
    win.webContents.insertCSS(css);
  });

  // win.webContents.openDevTools({ mode: "detach" });
};

app.setAboutPanelOptions({
  applicationName: "Toggl Track",
  website: "https://track.toggle.com",
});

app.setName("Toggl Track");

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (BLOCKED_URLS.some((u) => details.url.includes(u)))
      return callback({ cancel: true });
    return callback({});
  });

  createWindow();
});
