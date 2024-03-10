import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		"/categories",
		"/categories/(.*)",
		"/collections/(.*)",
		"/collections",
		"/product/(.*)",
		"/products/(.*)",
	],
});
