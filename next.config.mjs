/** @type {import('next').NextConfig} */

// The 'incremental' value allows you to adopt PPR for specific routes.
const nextConfig = {
    experimental: {
        ppr: 'incremental',
    },    
};

export default nextConfig;
