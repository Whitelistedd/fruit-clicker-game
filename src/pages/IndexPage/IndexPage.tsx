import { Section } from "@telegram-apps/telegram-ui";
import Coin from "@/assets/svgs/Coin.svg?react";
import GrapeFruitSrc from "@/assets/imgs/grapefruit.png";

import styles from "./IndexPage.module.scss";

import { useState, type FC } from "react";
import { InfoPill } from "@/components/InfoPill";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatNumber } from "@/helpers/formatNumber";
import { setPerTap } from "@/store/slices/user";
export const IndexPage: FC = () => {
  const { totalTapsCounter, perTap, perHour } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [screenTapPosition, setScreenTapPosition] = useState({ x: 0, y: 0 });
  const [tapCombo, setTapCombo] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setScreenTapPosition({ x: e.pageX, y: e.pageY });
    setTapCombo((prev) => {
      dispatch(setPerTap(1));
      return prev + 1;
    });
    timeoutId && clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setTapCombo(0);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.infoPills}>
          <div className={styles.topInfo}>
            <InfoPill
              className={styles.heroPill}
              wrapClassName={styles.heroPillWrap}
              label="Hero"
              labelRight="95%"
            >
              Panda
            </InfoPill>
            <InfoPill wrapClassName={styles.infoCountPill} label="Per hour">
              <Coin />
              <span className={styles.infoCount}>{formatNumber(perHour)}</span>
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
              label="Hero"
              labelRight="95%"
            >
              Grape
            </InfoPill>
            <InfoPill
              className={styles.boostPill}
              wrapClassName={styles.boostPillWrap}
              label="Boost"
            ></InfoPill>
          </div>
        </div>
        <div onClick={(e) => handleScreenTap(e)}>
          <img className={styles.mainFruitImage} src={GrapeFruitSrc} />
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
