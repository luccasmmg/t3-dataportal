import Image from "next/image";

interface ShowcaseCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  technology: "astrojs" | "nextjs" | "nuxtjs";
}

const technologyBadges = {
  astrojs: (
    <span className="rounded-xl bg-purple-800 px-1.5 py-0.5 text-xs text-white">
      AstroJS
    </span>
  ),
  nextjs: <span className="bg-blue-800 px-1 py-0.5 text-white">NextJS</span>,
  nuxtjs: <span className="bg-emerald-800 px-1 py-0.5 text-white">NuxtJS</span>,
};

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
      <div className="mt-4">
        <div className="flex justify-between">
          <h3 className="text-sm text-gray-700">
            <a href={link}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="text-sm font-medium capitalize text-gray-900">
            {technologyBadges[technology]}
          </p>
        </div>
        <p className="mt-1 text-justify text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
