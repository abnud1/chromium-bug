importScripts("/workbox-sw.js");
const networkOnly = new workbox.strategies.NetworkOnly({
  plugins: [
    new workbox.backgroundSync.BackgroundSyncPlugin("testRequests", {}),
  ],
});
workbox.routing.registerRoute(
  "/test",
  (handlerOptions) => {
    return networkOnly.handle(handlerOptions);
  },
  "POST"
);
