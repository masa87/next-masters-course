export const formatPrice = (price: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
	return formatter;
};
