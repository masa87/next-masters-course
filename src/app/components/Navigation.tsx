import React from "react";
import { ActiveLink } from "./atoms/ActiveLink";

const Navigation = () => {
	return (
		<nav className="fixed z-50 w-full bg-gray-800 font-bold shadow-md">
			<div className="container mx-auto flex items-center justify-between p-4">
				<div className="space-x-4">
					<ActiveLink
						href={"/"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
					>
						Home
					</ActiveLink>
					<ActiveLink
						href={"/products"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
						exact={true}
					>
						All
					</ActiveLink>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
