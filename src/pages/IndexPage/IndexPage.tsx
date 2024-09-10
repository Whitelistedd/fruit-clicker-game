import {Section} from "@telegram-apps/telegram-ui";

import styles from "./IndexPage.module.scss";

import React, {useState, type FC, useRef, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setEnergy,
} from "@/store/slices/user";

export const IndexPage: FC = () => {
  const {
    energy,
    per_tap,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const clicksRef = useRef({ x: 0, y: 0 });
  const isRegenerating = useRef(false)
  const [tapCombo, setTapCombo] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(energy <= 0) return
    isRegenerating.current = false;
    clicksRef.current = { x: e.pageX, y: e.pageY };
    per_tap && setTapCombo((prev) => prev + per_tap);
    // dispatch(handleTap());
    timeoutId && clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setTapCombo(0);
      isRegenerating.current = true;
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRegenerating && !isNaN(energy))
        dispatch(setEnergy({ type: "add" }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRegenerating,energy]);
  //
  // useEffect(() => {
  //   if (!boosting || !per_tap) return;
  //   const timeout = setTimeout(() => {
  //     dispatch(setPerTap(per_tap / 2));
  //     dispatch(setBoostCooldown(true));
  //     dispatch(setBoostingStatus(false));
  //     setTimeout(() => {
  //       dispatch(setBoostCooldown(false));
  //     }, 10000);
  //   }, 5000);
  //
  //   return () => clearTimeout(timeout);
  // }, [boosting,per_tap]);
  //
  // useEffect(() => {
  //   if(energy < max_energy) {
  //     setIsRegenerating(true)
  //   }
  // },[])
  //
  // useEffect(() => {
  //   if(boosting) {
  //     dispatch(setBoostCooldown(true));
  //     dispatch(setBoostingStatus(false));
  //     setTimeout(() => {
  //       dispatch(setBoostCooldown(false));
  //     }, 10000);
  //   }
  //   if(boostCoolDown) {
  //     dispatch(setBoostCooldown(false));
  //   }
  // }, [main_fruit]);

  return (
    <Section>
      <div className={styles.container}>
        <div className={styles.wrap}>
          {/*<div className={styles.infoPills}>*/}
          {/*  <div className={styles.topInfo}>*/}
          {/*    /!*<InfoPill*!/*/}
          {/*    /!*  className={styles.heroPill}*!/*/}
          {/*    /!*  wrapClassName={styles.heroPillWrap}*!/*/}
          {/*    /!*  label="Hero"*!/*/}
          {/*    /!*  labelRight={`${calculatePercentageDone(total_taps_counter, 10)}`}*!/*/}
          {/*    /!*>*!/*/}
          {/*    /!*  <span className={styles.heroPillTitle}>{main_fruit?.name && CapitalFirstLetter(main_fruit?.name)}</span>*!/*/}
          {/*    /!*  <img className={styles.heroPillImgBg} src={heroesBgSrc} />*!/*/}
          {/*    /!*  <img className={styles.heroPillImg} src={heroImg} />*!/*/}
          {/*    /!*</InfoPill>*!/*/}
          {/*    <InfoPill wrapClassName={styles.infoCountPill} label="Per hour">*/}
          {/*      <Coin />*/}
          {/*      <span className={styles.infoCount}>*/}
          {/*        {formatNumber(per_tap * 60)}*/}
          {/*      </span>*/}
          {/*    </InfoPill>*/}
          {/*    <InfoPill wrapClassName={styles.infoCountPill} label="Per tap">*/}
          {/*      <Coin />*/}
          {/*      <span className={styles.infoCount}>{per_tap}</span>*/}
          {/*    </InfoPill>*/}
          {/*  </div>*/}
          {/*  <InfoPill*/}
          {/*    wrapClassName={`${styles.totalCoinsCounter} ${styles.infoCountPill}`}*/}
          {/*  >*/}
          {/*    <Coin />*/}
          {/*    <span className={`${styles.totalCoinsCount} ${styles.infoCount}`}>*/}
          {/*      {Number(total_taps_counter).toLocaleString()}*/}
          {/*    </span>*/}
          {/*    {main_fruit?.color && <Dash color={main_fruit?.color} className={styles.totalCoinsDash}/>}*/}
          {/*  </InfoPill>*/}
          {/*  <div className={styles.bottomInfo}>*/}
          {/*    <InfoPill*/}
          {/*      wrapProps={{style: {borderColor: main_fruit?.color}}}*/}
          {/*      className={styles.fruitPill}*/}
          {/*      wrapClassName={styles.fruitPillWrap}*/}
          {/*      label={`Fruit Level: ${main_fruit_stats.level} (Max: ${lastFruitLevel})`}*/}
          {/*      labelRight={*/}
          {/*        main_fruit_stats?.current !== null && nextLevelTapsNeeded*/}
          {/*          ? `${calculatePercentageDone(*/}
          {/*              main_fruit_stats?.current,*/}
          {/*              nextLevelTapsNeeded*/}
          {/*            )}%`*/}
          {/*          : "MAX"*/}
          {/*      }*/}
          {/*      bottomLeftLabel={`Energy: ${energy} (Max: ${max_energy})`}*/}
          {/*      bottomRightLabel={`fruit taps: ${main_fruit_stats.taps}`}*/}
          {/*    >*/}
          {/*      {main_fruit?.name && CapitalFirstLetter(main_fruit?.name)}*/}
          {/*      <img*/}
          {/*        className={styles.fruitPillImgLeft}*/}
          {/*        alt="fruit image"*/}
          {/*        src={fruitImg}*/}
          {/*        width={90}*/}
          {/*        height={101}*/}
          {/*      />*/}
          {/*      <img*/}
          {/*        className={styles.fruitPillImgRight}*/}
          {/*        alt="fruit image"*/}
          {/*        src={fruitImg}*/}
          {/*        width={90}*/}
          {/*        height={101}*/}
          {/*      />*/}
          {/*    </InfoPill>*/}
          {/*    <InfoPill*/}
          {/*      onClick={() => handleBoosting()}*/}
          {/*      className={styles.boostPill}*/}
          {/*      wrapClassName={`${(boosting || boostCoolDown) && styles.boostPillWrapActivated} ${*/}
          {/*        styles.boostPillWrap*/}
          {/*      }`}*/}
          {/*      label={boostCoolDown ? "Coolingdown" : boosting ? "Boosting" : "Boost"}*/}
          {/*    ></InfoPill>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={styles.fruitContainer} onClickCapture={(e) => handleScreenTap(e)}>
            {/*{main_fruit?.color && <Splash className={styles.fruitSplash} color={main_fruit?.color}/>}*/}
            {/*<div className={styles.mainFruitImage}>*/}

            {/*</div>*/}

            <img
              className={styles.mainFruitImage}
              alt="fruit image to click"
              src={"https://i.ibb.co/2PqKs2D/te-1.webp"}
              fetchPriority={"high"}
              loading={"lazy"}
            />
          </div>
            <div
              style={{
                top: clicksRef.current.y - 64,
                left: clicksRef.current.x - 86.5,
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