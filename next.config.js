/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,

  images: {
    loader: "akamai",
    path: "",
    domains: [
      "www.wedcell.com",
      "wedcell.com",
      "images.pexels.com",
      "wedcell.cloudjiffy.net",
      "wedcell.herokuapp.com",
      "www.vhv.rs",
      "vhv.rs",
      "pngset.com",
      "upload.wikimedia.org",
      "www.upload.wikimedia.org",
      "wedcell-s3-next.s3.ap-south-1.amazonaws.com",
      "localhost",
      "cdn.pixabay.com",
      "images.unsplash.com",
      // "wedcelldata.s3.ap-south-1.amazonaws.com",
      // "http://wedcelldec3-env.eba-2kmv34xf.ap-south-1.elasticbeanstalk.com",
      // "https://wedcelldec3-env.eba-2kmv34xf.ap-south-1.elasticbeanstalk.com",
      // 'wedcell-s3-1.s3.ap-south-1.amazonaws.com',
      "https://wedcell.s3.ap-south-1.amazonaws.com",
      "wedcell.s3.ap-south-1.amazonaws.com",
      "https://wedcell-s3-1.s3.ap-south-1.amazonaws.com",
      "https://ec2-13-235-133-97.ap-south-1.compute.amazonaws.com",
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
      "https://wedcell.s3.ap-south-1.amazonaws.com/vendors",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  outputFileTracing: false,
};
module.exports = nextConfig;
