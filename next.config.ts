/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  // Para GitHub Pages com repositório que não está na raiz:
  // basePath: '/nome-do-repositorio',
  // assetPrefix: '/nome-do-repositorio/',
};

module.exports = nextConfig;
