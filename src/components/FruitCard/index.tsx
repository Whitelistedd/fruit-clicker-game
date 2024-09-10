import styles from "./FruitCard.module.scss";
import Coin from "@/assets/svgs/Coin.svg?react";
import Splash from "@/assets/svgs/Splash.tsx"

interface FruitCardProps extends React.HTMLAttributes<HTMLDivElement> {
    level: string | number;
    perHour: string | number;
    fruitImg: string
    color?: string,
    name?: string,
    unlocked: boolean
    active: boolean
    price: number
    fruitId: number
    onPurchase?: (fruitId: number) => void
}

export const FruitCard = ({
        perHour,
        className,
        level,
        color,
        fruitImg,
        name,
        unlocked,
        active,
        price,
        onPurchase,
        fruitId,
        ...props
    }: FruitCardProps) => {

    return (
        <div className={`${className} ${onPurchase && styles.clickable} ${styles.container}`} onClick={() => onPurchase && onPurchase(fruitId)} {...props}>
            {color && <Splash className={styles.fruitSplash} color={color}/>}
            <img className={styles.fruitImg} height={130} src={fruitImg} />
            <span className={styles.level}>Level {level}</span>
            <span className={styles.perHour}><Coin /> +{perHour}/h</span>
            <span className={styles.fruitName}>{name}</span>
            <span className={styles.purchase}><Coin /> {active ? "ACTIVE" : unlocked ? "UNLOCKED" : price}</span>
        </div>
    );
};
