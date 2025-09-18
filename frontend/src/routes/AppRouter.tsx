import { BrawlersPage, Events, Home, Info, Maps, Ranks } from "@/pages";
import { BrowserRouter, Route } from "react-router-dom";
import { DesktopLayout, MobileLayout } from "@/components";
import { RoutesWithNoFound } from "./RoutesWithNotFound";
import { useMediaQuery } from "@/hooks";

export const AppRouter = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <BrowserRouter>
      <RoutesWithNoFound>
        <Route path="/" element={isTablet ? <DesktopLayout /> : <MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="brawlers" element={<BrawlersPage />} />
          <Route path="ranks" element={<Ranks />} />
          <Route path="maps" element={<Maps />} />
          <Route path="events" element={<Events />} />
          <Route path="info" element={<Info />} />
        </Route>
      </RoutesWithNoFound>
    </BrowserRouter>
  );
};
