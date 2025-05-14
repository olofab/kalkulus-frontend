
/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://kalkulus-backend-production.up.railway.app/api/:path*' // ✅ må ha https://
      }
    ]
  }
}

