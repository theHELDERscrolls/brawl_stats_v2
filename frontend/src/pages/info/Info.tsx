import { BasicTag, PageHeader } from "@/components";
import { useEffect } from "react";

export const Info = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="flex flex-col w-full h-full gap-8">
      <PageHeader
        title="Resources & Information"
        desc="Offical APIs, developer resources and project repositories."
      />
      <article>
        <ul className="grid items-center justify-center [grid-template-columns:repeat(auto-fit,minmax(275px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-5 p-5">
          <li className="shadow-md rounded-xl shadow-neutral-950">
            <a
              className="relative flex overflow-hidden group rounded-xl"
              href="https://developer.brawlstars.com/#/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BasicTag
                imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9RMjFyZUhoclU2ZjVTQU53Tkt1Vy5wbmcifQ:supercell:mspxeFj-oAc84JTnGA3GwCTW3oKRnMYCO43SpG1iNtw?width=2400"
                imageClassName="h-13"
                title="Official Brawl Stars API"
                titleClassName="text-h2 sm:text-h4 text-yellow-400"
                subtitle="Supercell's official API for accessing real-time game data, player stats and club information."
                subtitleClassName="text-h6 text-balance text-neutral-100"
                fontClassName="font-brawlstars font-extralight sm:gap-5"
                className="transition-all duration-300 ease-in-out min-h-50 bg-amber-400/10 sm:bg-neutral-700 sm:group-hover:scale-101 sm:group-hover:bg-amber-400/10 rounded-xl"
                containerClassName="p-3 sm:p-5 flex items-center justify-center gap-3 sm:gap-5"
              />
              <BasicTag
                iconId="icon-link"
                className="absolute top-3 right-2 text-amber-400/50 sm:transition-all sm:duration-300 sm:ease-in-out sm:translate-x-full sm:group-hover:translate-x-0"
                size={50}
              />
            </a>
          </li>

          <li className="shadow-md rounded-xl shadow-neutral-950">
            <a
              className="relative flex overflow-hidden group rounded-xl"
              href="https://brawlapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BasicTag
                imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9lckZVQjdhRVdkRktvb01wMmZzQi5wbmcifQ:supercell:PWIL3ICLCO0ZAkADBF1iFRiqCelVfgecT4eTP_AKskc?width=2400"
                imageClassName="h-13"
                title="BrawlAPI"
                titleClassName="text-h2 sm:text-h4 text-lime-400"
                subtitle="Community-driven API with extended endpoints, brawler data and additional game information."
                subtitleClassName="text-h6 text-balance text-neutral-100"
                fontClassName="font-brawlstars font-extralight sm:gap-5"
                className="transition-all duration-300 ease-in-out min-h-50 bg-lime-400/10 sm:bg-neutral-700 sm:group-hover:scale-101 sm:group-hover:bg-lime-400/10 rounded-xl"
                containerClassName="p-3 sm:p-5 flex items-center justify-center gap-3 sm:gap-5"
              />
              <BasicTag
                iconId="icon-link"
                className="absolute top-3 right-2 text-lime-400/50 sm:transition-all sm:duration-300 sm:ease-in-out sm:translate-x-full sm:group-hover:translate-x-0"
                size={50}
              />
            </a>
          </li>

          <li className="shadow-md rounded-xl shadow-neutral-950">
            <a
              className="relative flex overflow-hidden group rounded-xl"
              href="https://github.com/Brawlify/CDN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BasicTag
                imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9ucnU0UVNQVlVkVEhvVERxMVpxdS5wbmcifQ:supercell:KyOaqu_1gL2vFJpzEd0AABww3GAZzF688azTXXapoEs?width=2400"
                imageClassName="h-13"
                title="BrawlAPI Github"
                titleClassName="text-h2 sm:text-h4 text-sky-400"
                subtitle="Open source repository with comprehensive documentation, code examples and community contributions."
                subtitleClassName="text-h6 text-balance text-neutral-100"
                fontClassName="font-brawlstars font-extralight sm:gap-5"
                className="transition-all duration-300 ease-in-out min-h-50 bg-sky-400/10 sm:bg-neutral-700 sm:group-hover:scale-101 sm:group-hover:bg-sky-400/10 rounded-xl"
                containerClassName="p-3 sm:p-5 flex items-center justify-center gap-3 sm:gap-5"
              />
              <BasicTag
                iconId="icon-link"
                className="absolute top-3 right-2 text-sky-400/50 sm:transition-all sm:duration-300 sm:ease-in-out sm:translate-x-full sm:group-hover:translate-x-0"
                size={50}
              />
            </a>
          </li>

          <li className="shadow-md rounded-xl shadow-neutral-950">
            <a
              className="relative flex overflow-hidden group rounded-xl"
              href="https://fankit.supercell.com/d/YvtsWV4pUQVm/game-assets"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BasicTag
                imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC81THN5dHE3c3RGNDRLUkVRa0E1aS5wbmcifQ:supercell:Pe5ZFsjgmSIcH3R4PNqPw8y3Y8jK34an7dyTIaxOw54?width=2400"
                imageClassName="h-13"
                title="Official Assets"
                titleClassName="text-h2 sm:text-h4 text-red-400"
                subtitle="High-quality visual resources including character renders, icons and promotional materials."
                subtitleClassName="text-h6 text-balance text-neutral-100"
                fontClassName="font-brawlstars font-extralight sm:gap-5"
                className="transition-all duration-300 ease-in-out min-h-50 bg-red-400/10 sm:bg-neutral-700 sm:group-hover:scale-101 sm:group-hover:bg-red-400/10 rounded-xl"
                containerClassName="p-3 sm:p-5 flex items-center justify-center gap-3 sm:gap-5"
              />
              <BasicTag
                iconId="icon-link"
                className="absolute top-3 right-2 text-red-400/50 sm:transition-all sm:duration-300 sm:ease-in-out sm:translate-x-full sm:group-hover:translate-x-0"
                size={50}
              />
            </a>
          </li>

          <li className="shadow-md rounded-xl shadow-neutral-950">
            <a
              className="relative flex overflow-hidden group rounded-xl"
              href="https://github.com/theHELDERscrolls/brawl_stats_v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BasicTag
                imgSrc="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9pd0NaOG5DcXJVUFJLdk11dU44NS5wbmcifQ:supercell:-0wWcFxLTFlrttqN8dZWy3WwZn9cRHypVqBZkXTHRhc?width=2400"
                imageClassName="h-13"
                title="Project respository"
                titleClassName="text-h2 sm:text-h4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-orange-500 to-lime-500"
                subtitle="Explore the full source code of the Brawl Stats v2 website. Contribute, report issues, and collaborate on the project."
                subtitleClassName="text-h6 text-balance text-neutral-100"
                fontClassName="font-brawlstars font-extralight sm:gap-5"
                className="transition-all duration-300 ease-in-out min-h-50 bg-gradient-to-r from-purple-400/10 via-orange-400/10 to-lime-400/10 sm:group-hover:scale-101 rounded-xl"
                containerClassName="p-3 sm:p-5 flex items-center justify-center gap-3 sm:gap-5"
              />
              <BasicTag
                iconId="icon-link"
                className="absolute top-3 right-2 text-orange-400/50 sm:transition-all sm:duration-300 sm:ease-in-out sm:translate-x-full sm:group-hover:translate-x-0"
                size={50}
              />
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
};
