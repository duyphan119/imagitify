import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((item) => (
            <li key={item.route}>
              <Link href={item.route} className="flex-center flex-col gap-2">
                <div className="flex-center rounded-full bg-white p-4">
                  <Image
                    src={item.icon}
                    width={24}
                    height={24}
                    alt={item.label}
                  />
                </div>
                <p className="p-14-medium text-center text-white">
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
}
