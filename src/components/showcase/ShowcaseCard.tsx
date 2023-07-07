import Image from "next/image";

interface ShowcaseCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  technology: "astrojs" | "nextjs" | "nuxtjs";
}

export function ShowcaseCard({
  title,
  description,
  image,
  link,
  technology,
}: ShowcaseCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
        <Image
          src={image}
          width={500}
          height={500}
          alt={title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={link}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <p className="text-sm font-medium capitalize text-gray-900">
          {technology}
        </p>
      </div>
    </div>
  );
}
