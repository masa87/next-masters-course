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
            leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
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
             hover:bg-gray-100 hover:text-gray-700 "
							>
								1
							</Link>
						</li>
						<li
							className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700"
						>
							...
						</li>
						<li>
							<Link
								href={`/products/${currentPage - 2}`}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500
             hover:bg-gray-100 hover:text-gray-700"
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
             hover:bg-gray-100 hover:text-gray-700 "
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
             hover:text-blue-700 "
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
            hover:bg-gray-100 hover:text-gray-700 "
							>
								{currentPage + 1}
							</Link>
						</li>
						{(currentPage + 2) * itemsPerPage <= totalItemsCount && (
							<li>
								<Link
									href={`/products/${currentPage + 2}`}
									className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 
            hover:bg-gray-100 hover:text-gray-700 "
								>
									{currentPage + 2}
								</Link>
							</li>
						)}
						<li>
							<Link
								href={`/products/${currentPage + 1}`}
								className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight
             text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
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
