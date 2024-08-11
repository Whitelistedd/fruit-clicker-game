import { Section } from "@telegram-apps/telegram-ui";
import Coin from "@/assets/svgs/Coin.svg?react";

import styles from "./IndexPage.module.scss";

import { useEffect, useState, type FC } from "react";
import { InfoPill } from "@/components/InfoPill";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatNumber } from "@/helpers/formatNumber";
import {
  reFillEnergy,
  setBoostingStatus,
  setPerTap,
  setTap,
} from "@/store/slices/user";
import { fruits } from "@/constants/fruits";
import { heroes } from "@/constants/heroes";
import heroesBgSrc from "@/assets/imgs/panda_bg.png";
import { CapitalFirstLetter } from "@/helpers/CapitalFirstLetter";
import { calculatePercentageDone } from "@/helpers/calculatePercentageDone";

export const IndexPage: FC = () => {
  const {
    totalTapsCounter,
    perTap,
    levels,
    energy,
    maxEnergy,
    heroType,
    boosting,
    fruitType,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [screenTapPosition, setScreenTapPosition] = useState({ x: 0, y: 0 });
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [tapCombo, setTapCombo] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const fruitImg = fruits[fruitType].src;
  const heroImg = heroes[heroType];

  const currentFruit = levels[fruitType];

  const nextLevelTapsNeeded =
    fruits[fruitType]?.levels[levels?.[fruitType]?.level + 1]?.tapsNeeded;

  const lastFruitLevel = Object.keys(fruits[fruitType].levels)[
    Object.keys(fruits[fruitType].levels).length - 1
  ];

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsRegenerating(false);
    setScreenTapPosition({ x: e.pageX, y: e.pageY });
    setTapCombo((prev) => prev + perTap);
    dispatch(setTap(perTap));
    timeoutId && clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setTapCombo(0);
      setIsRegenerating(true);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  const handleBoosting = () => {
    dispatch(setBoostingStatus(true));
    dispatch(setPerTap(perTap * 2));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRegenerating) dispatch(reFillEnergy());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRegenerating]);

  useEffect(() => {
    if (!boosting) return;
    const timeout = setTimeout(() => {
      dispatch(setPerTap(perTap / 2));
      dispatch(setBoostingStatus(false));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [boosting]);

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.infoPills}>
          <div className={styles.topInfo}>
            <InfoPill
              className={styles.heroPill}
              wrapClassName={styles.heroPillWrap}
              label="Hero"
              labelRight={`${calculatePercentageDone(totalTapsCounter, 10)}`}
            >
              {CapitalFirstLetter(heroType)}
              <img className={styles.heroPillImgBg} src={heroesBgSrc} />
              <img className={styles.heroPillImg} src={heroImg} />
            </InfoPill>
            <InfoPill wrapClassName={styles.infoCountPill} label="Per hour">
              <Coin />
              <span className={styles.infoCount}>
                {formatNumber(perTap * 60)}
              </span>
            </InfoPill>
            <InfoPill wrapClassName={styles.infoCountPill} label="Per tap">
              <Coin />
              <span className={styles.infoCount}>{perTap}</span>
            </InfoPill>
          </div>
          <InfoPill
            wrapClassName={`${styles.totalCoinsCounter} ${styles.infoCountPill}`}
          >
            <Coin />
            <span className={`${styles.totalCoinsCount} ${styles.infoCount}`}>
              {Number(totalTapsCounter).toLocaleString()}
            </span>
          </InfoPill>
          <div className={styles.bottomInfo}>
            <InfoPill
              className={styles.fruitPill}
              wrapClassName={styles.fruitPillWrap}
              label={`Fruit Level: ${currentFruit.level} (Max: ${lastFruitLevel})`}
              labelRight={
                nextLevelTapsNeeded
                  ? `${calculatePercentageDone(
                      currentFruit.current,
                      nextLevelTapsNeeded
                    )}%`
                  : "MAX"
              }
              bottomLeftLabel={`Energy: ${energy} (Max: ${maxEnergy})`}
              bottomRightLabel={`fruit taps: ${currentFruit.taps}`}
            >
              {CapitalFirstLetter(fruitType)}
              <img
                className={styles.fruitPillImgLeft}
                alt="fruit image"
                src={fruitImg}
                width={90}
                height={101}
              />
              <img
                className={styles.fruitPillImgRight}
                alt="fruit image"
                src={fruitImg}
                width={90}
                height={101}
              />
            </InfoPill>
            <InfoPill
              onClick={() => handleBoosting()}
              className={styles.boostPill}
              wrapClassName={`${boosting && styles.boostPillWrapActivated} ${
                styles.boostPillWrap
              }`}
              label={boosting ? "Boosting" : "Boost"}
            ></InfoPill>
          </div>
        </div>
        <div onClickCapture={(e) => handleScreenTap(e)}>
          <img
            className={styles.mainFruitImage}
            alt="fruit image to click"
            src={fruitImg}
          />
          <div
            style={{
              top: screenTapPosition.y - 64,
              left: screenTapPosition.x - 86.5,
              opacity: tapCombo ? 1 : 0,
            }}
            className={styles.ComboTapCounter}
          >
            +{tapCombo}
          </div>
        </div>
      </div>
    </Section>
  );
};

/* export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header='Features'
        footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Connect your TON wallet'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header='Application Launch Data'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link>
      </Section>
    </List>
  );
 */
