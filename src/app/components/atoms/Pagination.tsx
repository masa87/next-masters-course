import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	countItems: number;
	itemsPerPage: number;
	totalItemsCount: number;
}

const Pagination = ({
	currentPage,
	countItems,
	itemsPerPage,
	totalItemsCount,
}: PaginationProps) => {
	const isNextpageAvailable = countItems >= itemsPerPage;

	return (
		<div className="mt-8 flex justify-center" aria-label="pagination">
			<ul className="inline-flex -space-x-px text-sm">
				{currentPage > 1 && (
					<li>
						<Link
							href={`/products/${currentPage - 1}`}
							className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 
            leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Previous
						</Link>
					</li>
				)}
				{currentPage > 3 && (
					<>
						<li>
							<Link
								href={`/products/${1}`}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								1
							</Link>
						</li>
						<li
							className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							...
						</li>
						<li>
							<Link
								href={`/products/${currentPage - 2}`}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								{currentPage - 2}
							</Link>
						</li>
					</>
				)}
				{currentPage > 1 && (
					<li>
						<Link
							href={`/products/${currentPage - 1}`}
							className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							{currentPage - 1}
						</Link>
					</li>
				)}
				<li>
					<Link
						href={`/products/${currentPage}`}
						aria-current="page"
						className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100
             hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
					>
						{currentPage}
					</Link>
				</li>
				{isNextpageAvailable && (
					<>
						{" "}
						<li>
							<Link
								href={`/products/${currentPage + 1}`}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 
            hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								{currentPage + 1}
							</Link>
						</li>
						{(currentPage + 2) * itemsPerPage <= totalItemsCount && (
							<li>
								<Link
									href={`/products/${currentPage + 2}`}
									className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 
            hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									{currentPage + 2}
								</Link>
							</li>
						)}
						<li>
							<Link
								href={`/products/${currentPage + 1}`}
								className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight
             text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Next
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Pagination;
