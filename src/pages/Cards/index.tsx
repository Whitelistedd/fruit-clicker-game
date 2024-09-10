import {Section} from '@telegram-apps/telegram-ui';

import {FC, useEffect, useState} from 'react';
import styles from "@/pages/Cards/Cards.module.scss";
import {InfoPill} from "@/components/InfoPill";
import {formatNumber} from "@/helpers/formatNumber.ts";
import {useAppDispatch, useAppSelector} from "@/store";
import Coin from "@/assets/svgs/Coin.svg?react";
import {useGetFruitsQuery} from "@/store/slices/fruits";
import {FruitCard} from "@/components/FruitCard";
import {ActionModal} from "@/components/ActionModal/Index.tsx";
import {setMainFruit, setUserFruitLevels} from "@/store/slices/user";
import {fruitType} from "@/store/slices/fruits/fruits.types.ts";
import Dash from "@/assets/svgs/Dash.svg.tsx";

export const Cards: FC = () => {
  const {
    per_tap,
    total_taps_counter,
    main_fruit,
    user_fruit_levels
  } = useAppSelector((state) => state.user);
  const [actionModalType, setActionModalType] = useState<{type: "purchase" | "activate", fruitId: number}>({type: "purchase", fruitId: 0})
  const [errorModal, setErrorModal] = useState<string>("")

  const {data, refetch} = useGetFruitsQuery({})
    const dispatch = useAppDispatch()

    const handleBuyFruit = () => {
        const newFruit = data?.find(fruit => fruit.id ==  actionModalType.fruitId) as fruitType
        if(total_taps_counter <= newFruit.price) {
            toggleBuyFruitModal()
            return setErrorModal("You cant afford to Purchase this Fruit")
        }
        const newUserFruitLevels = [...user_fruit_levels]
        newUserFruitLevels.push({
            created_at: "",
            current: 0,
            fruit_id: actionModalType.fruitId,
            level: 1,
            taps: 0,
            unlocked: true,
            user_id: "",
        },)
        dispatch(setUserFruitLevels(newUserFruitLevels))
        toggleBuyFruitModal()
    }

    const handleActivateFruit = () => {
      const newFruit = data?.find(fruit => fruit.id ==  actionModalType.fruitId) as fruitType
        if(newFruit) dispatch(setMainFruit(newFruit))
        toggleActivateFruitModal()
    }

    const toggleBuyFruitModal = (fruitId?: number) => {
        setActionModalType({type:"purchase", fruitId: fruitId || 0 })
    }

    const toggleActivateFruitModal = (fruitId?: number) => {
        setActionModalType({type:"activate", fruitId: fruitId || 0 })
    }

    const toggleErrorModal = (error?: string) => {
      setErrorModal(error || "")
    }

    useEffect(() => {
        refetch()
    }, []);

  return (
        <Section>
            <div className={styles.container}>
            {errorModal &&
                <ActionModal
                    title={errorModal}
                    onCancel={() => toggleErrorModal()}
                />
            }
            {Number(actionModalType.fruitId) > 0 &&
                <ActionModal
                    title={actionModalType.type === "purchase" ? "Are you sure you want to Purchase this Fruit?" : "Are you sure you want to Activate this Fruit"}
                    onCancel={actionModalType.type === "purchase" ? toggleBuyFruitModal : toggleActivateFruitModal}
                    onSubmit={actionModalType.type === "purchase" ? handleBuyFruit : handleActivateFruit}
                />
            }
                <div className={styles.wrap}>
                    <div className={styles.infoPills}>
                        <div className={styles.topInfo}>
                            <InfoPill
                                label="Balance"
                                className={styles.totalCoinsCounter}
                                wrapClassName={`${styles.totalCoinsCounterWrap} ${styles.infoCountPill}`}
                            >
                                <Coin/>
                                <span className={`${styles.totalCoinsCount} ${styles.infoCount}`}>
                              {main_fruit?.color && <Dash color={main_fruit?.color} className={styles.totalCoinsDash}/>}
                                    {Number(total_taps_counter).toLocaleString()}
                            </span>
                            </InfoPill>
                            <InfoPill wrapClassName={styles.infoCountPill} label="Per hour">
                                <Coin/>
                                <span className={styles.infoCount}>
                                {formatNumber(per_tap * 60)}
                            </span>
                            </InfoPill>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        {
                            data?.map(fruit => {
                                const typedFruit = fruit as fruitType
                                const fruitUserStats = user_fruit_levels.find(fruitStats => fruitStats.fruit_id === fruit.id)
                                const per_tap = typedFruit?.levels &&
                                    (fruitUserStats?.level
                                        ?
                                        typedFruit?.levels[fruitUserStats?.level as keyof typeof fruit.levels].taps_per_tap
                                        : typedFruit.levels[1].taps_per_tap)
                                return (
                                    <FruitCard
                                        fruitId={fruit.id}
                                        onPurchase={
                                            !fruitUserStats?.unlocked ?
                                                () => toggleBuyFruitModal(fruit.id)
                                            : fruit.id !== main_fruit?.id ?
                                                () => toggleActivateFruitModal(fruit.id)
                                            : undefined}
                                        key={fruit.id}
                                        price={fruit.price || 100}
                                        name={fruit.name || "-"}
                                        color={fruit?.color || undefined}
                                        fruitImg={fruit.src || ""}
                                        active={fruit.id === main_fruit?.id}
                                        perHour={(per_tap || 1) * 60}
                                        unlocked={fruitUserStats?.unlocked || false}
                                        level={fruitUserStats?.level || "0"}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Section>
  );
};
