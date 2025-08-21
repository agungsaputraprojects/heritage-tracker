/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
            },
        ],
        domains: ["images.unsplash.com", "picsum.photos"],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Add this to prevent hydration issues
    experimental: {
        esmExternals: false,
    },
    // Enable standalone output for Docker
    output: "standalone",
    // Optimize for production
    poweredByHeader: false,
    compress: true,
};

export default nextConfig;
