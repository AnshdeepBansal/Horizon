import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS for all origins
app.use(cors());

// Proxy requests to the Google API
app.use(
  "/google-api",
  createProxyMiddleware({
    target: "https://maps.googleapis.com",
    changeOrigin: true,
    pathRewrite: { "^/google-api": "" },
    onProxyReq: (proxyReq) => {
      console.log(`Proxying request: ${proxyReq.path}`);
    },
    // Add CORS headers to the response
    onProxyRes: (proxyRes, req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
  })
);

const PORT = 3000; // Your proxy server port
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
