/** @type {import('next').NextConfig} */
import * as NextMdx from "@next/mdx";

// ...

const withMDX = NextMdx.default({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [], // ESM ✅
	},
});

const nextConfig = {
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	experimental: {
		typedRoutes: false,
		mdxRs: true,
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "naszsklep-api.vercel.app",
			},
			{
				protocol: "https",
				hostname: "static-ourstore.hyperfunctor.com",
			},
		],
	},
};

export default withMDX(nextConfig);
