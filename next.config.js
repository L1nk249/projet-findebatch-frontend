/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cibul.s3.amazonaws.com',  'projet-findebatch-backend.vercel.app', 'res.cloudinary.com'],
  },


};


module.exports = nextConfig;