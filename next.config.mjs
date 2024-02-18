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
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "naszsklep-api.vercel.app",
			},
		],
	},
};

export default withMDX(nextConfig);
