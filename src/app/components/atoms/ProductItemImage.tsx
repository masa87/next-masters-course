import Image from "next/image";

type ProductItemImageProps = {
	url: string;
	alt: string;
};

export const ProductItemImage = ({ url, alt }: ProductItemImageProps) => {
	return (
		<Image
			className="h-64 w-full object-contain p-4"
			src={url}
			alt={alt}
			width={200}
			height={200}
		/>
	);
};
