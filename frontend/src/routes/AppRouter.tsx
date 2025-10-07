import { BrawlersPage, Home, Info, Maps, Ranks } from "@/pages";
import { BrowserRouter, Route } from "react-router-dom";
import { DesktopLayout, MobileLayout, ModalProvider } from "@/components";
import { RoutesWithNoFound } from "./RoutesWithNotFound";
import { useMediaQuery } from "@/hooks";

export const AppRouter = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <BrowserRouter>
      <ModalProvider>
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
      </ModalProvider>
    </BrowserRouter>
  );
};
