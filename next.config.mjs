/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nooygooyukumpkkvnsld.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
            },
        ],
    },
    // output: "export"
    // experimental: {
    //     ppr: 'incremental',
    // },
};

export default nextConfig;
