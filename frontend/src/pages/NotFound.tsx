import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 font-brawlstars font-extralight bg-neutral-800 text-neutral-100">
      <img
        src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC9GU1Z1MlR2VzlzVEtqTmgzVHpQVC5naWYifQ:supercell:beHLsiobVyDwHMFXoflX-wKWvnuEFv2S8v0JE3GVPeE?width=2400"
        alt="404 Sandy gif"
        loading="lazy"
        className="h-50 drop-shadow-md drop-shadow-neutral-950"
      />
      <h1 className="self-center text-h2">404 - PAGE NOT FOUND</h1>
      <p className="self-center text-h4 text-neutral-400">You will be redirect...</p>
    </section>
  );
};
