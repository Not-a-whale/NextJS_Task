/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: [
        {
            key: 'Access-Control-Allow-Origin',
            value: '*',
        },
        {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
    ]
}

module.exports = nextConfig
