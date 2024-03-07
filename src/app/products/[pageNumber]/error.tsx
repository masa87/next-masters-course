"use client";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	return (
		<div className="container mx-auto my-8 rounded-md bg-white p-8 shadow-lg">
			<h1 className="mb-4 text-3xl font-bold">Error</h1>
			<p className="mb-4 text-gray-600">{error.message}</p>
			<p className="mb-4 text-gray-600">{error.stack}</p>
			<p className="mb-4 text-gray-600">{error.digest}</p>
		</div>
	);
}
