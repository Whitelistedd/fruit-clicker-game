import { Section } from "@telegram-apps/telegram-ui";
import Coin from "@/assets/svgs/Coin.svg?react";

import styles from "./IndexPage.module.scss";

import React, { useMemo, useState, type FC, useEffect } from "react";
import { InfoPill } from "@/components/InfoPill";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatNumber } from "@/helpers/formatNumber";
import {
  handleTap,
  setBoostCooldown,
  setBoostingStatus,
  setEnergy,
  setPerTap,
} from "@/store/slices/user";
import { CapitalFirstLetter } from "@/helpers/CapitalFirstLetter";
import { calculatePercentageDone } from "@/helpers/calculatePercentageDone";
import Dash from "@/assets/svgs/Dash.svg.tsx";

export const IndexPage: FC = () => {
  const {
    energy,
    main_fruit,
    per_tap,
    boosting,
    main_fruit_stats,
    max_energy,
    boostCoolDown,
    total_taps_counter,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [tapCombo, setTapCombo] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const fruitImg = `${main_fruit?.src}`;

  const nextLevelTapsNeeded = useMemo(
    () =>
      main_fruit?.levels &&
      main_fruit_stats?.level &&
      main_fruit?.levels[main_fruit_stats?.level + 1]?.taps_needed,
    [main_fruit, main_fruit_stats]
  );

  const fruitLevelNumbers = useMemo(
    () => (main_fruit?.levels ? Object.keys(main_fruit?.levels) : []),
    [main_fruit?.levels]
  );

  const lastFruitLevel = useMemo(
    () => fruitLevelNumbers[fruitLevelNumbers.length - 1],
    [fruitLevelNumbers]
  );

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy <= 0) return;
    setIsRegenerating(false);
    setClickPosition({ x: e.pageX, y: e.pageY });
    per_tap && setTapCombo((prev) => prev + per_tap);
    dispatch(handleTap());
    timeoutId && clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setTapCombo(0);
      setIsRegenerating(true);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  const handleBoosting = () => {
    if (boosting || boostCoolDown) return;
    dispatch(setBoostingStatus(true));
    per_tap && dispatch(setPerTap(per_tap * 2));
  };

  const handleTurningOffBoost = () => {
    if (boosting) {
      dispatch(setBoostCooldown(true));
      dispatch(setBoostingStatus(false));
      setTimeout(() => {
        dispatch(setBoostCooldown(false));
      }, 10000);
    }
    if (boostCoolDown) {
      dispatch(setBoostCooldown(false));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRegenerating && !isNaN(energy))
        dispatch(setEnergy({ type: "add" }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRegenerating, energy]);

  useEffect(() => {
    if (!boosting || !per_tap) return;
    const timeout = setTimeout(() => {
      dispatch(setPerTap(per_tap / 2));
      dispatch(setBoostCooldown(true));
      dispatch(setBoostingStatus(false));
      setTimeout(() => {
        dispatch(setBoostCooldown(false));
      }, 10000);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [boosting, per_tap]);

  useEffect(() => {
    if (energy < max_energy) {
      setIsRegenerating(true);
    }
  }, []);

  useEffect(() => {
    handleTurningOffBoost();
  }, [main_fruit]);

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.infoPills}>
            <div className={styles.topInfo}>
              <InfoPill wrapClassName={styles.infoCountPill} label="Per hour">
                <Coin />
                <span className={styles.infoCount}>
                  {formatNumber(per_tap * 60)}
                </span>
              </InfoPill>
              <InfoPill wrapClassName={styles.infoCountPill} label="Per tap">
                <Coin />
                <span className={styles.infoCount}>{per_tap}</span>
              </InfoPill>
            </div>
            <InfoPill
              wrapClassName={`${styles.totalCoinsCounter} ${styles.infoCountPill}`}
            >
              <Coin />
              <span className={`${styles.totalCoinsCount} ${styles.infoCount}`}>
                {Number(total_taps_counter).toLocaleString()}
              </span>
              {main_fruit?.color && (
                <Dash
                  color={main_fruit?.color}
                  className={styles.totalCoinsDash}
                />
              )}
            </InfoPill>
            <div className={styles.bottomInfo}>
              <InfoPill
                wrapProps={{ style: { borderColor: main_fruit?.color } }}
                className={styles.fruitPill}
                wrapClassName={styles.fruitPillWrap}
                label={`Fruit Level: ${main_fruit_stats.level} (Max: ${lastFruitLevel})`}
                labelRight={
                  main_fruit_stats?.current !== null && nextLevelTapsNeeded
                    ? `${calculatePercentageDone(
                        main_fruit_stats?.current,
                        nextLevelTapsNeeded
                      )}%`
                    : "MAX"
                }
                bottomLeftLabel={`Energy: ${energy} (Max: ${max_energy})`}
                bottomRightLabel={`fruit taps: ${main_fruit_stats.taps}`}
              >
                {main_fruit?.name && CapitalFirstLetter(main_fruit?.name)}
                <img
                  className={styles.fruitPillImgLeft}
                  alt="fruit image"
                  src={fruitImg}
                  width={90}
                  height={101}
                  fetchPriority={"low"}
                />
                <img
                  className={styles.fruitPillImgRight}
                  alt="fruit image"
                  src={fruitImg}
                  width={90}
                  height={101}
                  fetchPriority={"low"}
                />
              </InfoPill>
              <InfoPill
                onClick={() => handleBoosting()}
                className={styles.boostPill}
                wrapClassName={`${
                  (boosting || boostCoolDown) && styles.boostPillWrapActivated
                } ${styles.boostPillWrap}`}
                label={
                  boostCoolDown
                    ? "Coolingdown"
                    : boosting
                    ? "Boosting"
                    : "Boost"
                }
              ></InfoPill>
            </div>
          </div>
          <div
            className={styles.fruitContainer}
            onClickCapture={(e) => handleScreenTap(e)}
          >
            <img
              className={styles.mainFruitImage}
              alt="fruit image to click"
              src={"https://i.imgur.com/YFl6XCw.png"}
              fetchPriority={"high"}
            />
          </div>
          <div
            style={{
              top: clickPosition.y - 64,
              left: clickPosition.x - 86.5,
              opacity: tapCombo ? 1 : 0,
            }}
            className={styles.ComboTapCounter}
          >
            {tapCombo ? `+${tapCombo}` : ""}
          </div>
        </div>
      </div>
    </Section>
  );
};
