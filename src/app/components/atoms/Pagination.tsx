import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	totalPages?: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
	const hasPreviousPage = currentPage > 1;
	const hasNextPage = (totalPages && currentPage < totalPages) || 1;

	return (
		<div className="mt-8 flex justify-center" aria-label="pagination">
			<ul className="flex space-x-4">
				{hasPreviousPage && (
					<li>
						<Link
							href={`/products/${currentPage - 1}`}
							className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-600"
						>
							Previous
						</Link>
					</li>
				)}

				{Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
					<li key={page}>
						<Link
							href={`/products/${currentPage}`}
							className={`rounded-md px-4 py-2 ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-blue-200"}`}
						>
							{currentPage}
						</Link>
					</li>
				))}

				{hasNextPage && (
					<li>
						<Link
							href={`/products/${currentPage + 1}`}
							className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-600"
						>
							Next
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Pagination;
