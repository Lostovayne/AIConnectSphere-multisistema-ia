const nextConfig = {
  assetPrefix: "/exp2-static",
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],    
  },  
}

export default nextConfig
