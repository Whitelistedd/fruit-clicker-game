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
import {FC, useEffect, useMemo, useState} from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";

import { BottomNavMenu } from "./BottomNavMenu";
import {useAppDispatch, useAppSelector} from "@/store";
import {setInitialInfo} from "@/store/slices/user";
import {useGetFruitsQuery} from "@/store/slices/fruits";
import {fruitType} from "@/store/slices/fruits/fruits.types.ts";

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLoading] = useState(true)
  const {main_fruit} = useAppSelector(state => state.user)
  const {data} = useGetFruitsQuery({})

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
    console.log(main_fruit,data,"main_fruit")
    if(main_fruit) return setLoading(false)
    if(!data?.length) return
    const default_main_fruit_id = 1
    const default_main_fruit = data?.find(fruit => fruit.id === default_main_fruit_id) as fruitType
    console.log(default_main_fruit)
    if(!default_main_fruit || !default_main_fruit?.levels) return
    dispatch(setInitialInfo({
      boosting: false,
      energy: 100,
      main_fruit: default_main_fruit as fruitType,
      main_fruit_stats: {
        taps: 0,
        current: 0,
        level: 1,
        unlocked: true,
        fruit_id: default_main_fruit_id,
        created_at: "",
        user_id: "",
      },
      max_energy: 100,
      per_tap: default_main_fruit?.levels[1].taps_per_tap,
      total_taps_counter: 0,
      user_fruit_levels: [{
        created_at: "",
        current: 0,
        fruit_id: default_main_fruit_id,
        level: 1,
        taps: 0,
        unlocked: true,
        user_id: ""
      }],
      boostCoolDown: false,
      created_at: "",
      id: ""
    }))
    setLoading(false)
  },[data])

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
