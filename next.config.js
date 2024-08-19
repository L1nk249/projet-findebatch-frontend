/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cibul.s3.amazonaws.com',  'projet-f-inde-b-ashbackend.vercel.app', 'res.cloudinary.com'],
  },


};


module.exports = nextConfig;