import GrapefruitSRC from "@/assets/imgs/grapefruit.png"
import styles from "./Loading.module.scss"

export const Loading = () => {
    return (
        <div className={styles.container}>
            <img className={styles.fruitImage} src={GrapefruitSRC} />
        </div>
    )
}