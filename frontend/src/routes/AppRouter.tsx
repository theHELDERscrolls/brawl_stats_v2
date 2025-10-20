import { BrowserRouter, Route } from "react-router-dom";
import { DesktopLayout, MobileLayout, ModalProvider } from "@/components";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/common"; // o tu propio loader
import { RoutesWithNoFound } from "./RoutesWithNotFound";
import { useMediaQuery } from "@/hooks";

const Home = lazy(() => import("@/pages/home/Home"));
const BrawlersPage = lazy(() => import("@/pages/brawlers/BrawlerPage"));
const Ranks = lazy(() => import("@/pages/ranks/Ranks"));
const Maps = lazy(() => import("@/pages/maps/Maps"));
const Info = lazy(() => import("@/pages/info/Info"));

export const AppRouter = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <BrowserRouter>
      <ModalProvider>
        <Suspense fallback={<Loader />}>
          <RoutesWithNoFound>
            <Route path="/" element={isTablet ? <DesktopLayout /> : <MobileLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="brawlers" element={<BrawlersPage />} />
              <Route path="ranks" element={<Ranks />} />
              <Route path="maps" element={<Maps />} />
              <Route path="info" element={<Info />} />
            </Route>
          </RoutesWithNoFound>
        </Suspense>
      </ModalProvider>
    </BrowserRouter>
  );
};
