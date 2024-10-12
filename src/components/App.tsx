import { routes } from "@/navigation/routes.tsx";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { FC, useEffect, useMemo } from "react";
import { Route, Router, Routes } from "react-router-dom";

import { BottomNavMenu } from "./BottomNavMenu";
import { useAppDispatch } from "@/store";
import { generateInitialInfo } from "@/store/slices/user";
import { useGetFruitsQuery } from "@/store/slices/fruits";

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const dispatch = useAppDispatch();
  const { data } = useGetFruitsQuery({});

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  useEffect(() => {
    if (!data || data?.length === 0) return;
    dispatch(generateInitialInfo(data));
  }, [data]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
        <BottomNavMenu />
      </Router>
    </AppRoot>
  );
};
