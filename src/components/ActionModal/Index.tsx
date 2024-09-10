import {Button} from "@/components/Button/Index.tsx";
import styles from "./ActionModal.module.scss"

interface Props {
    onCancel: () => void;
    onSubmit?: () => void;
    title: string
}

export const ActionModal = ({onCancel, onSubmit, title}:Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <h1 className={"reset"}>{title}</h1>
                <div className={styles.buttons}>
                    <Button onClick={() => onCancel()} className={styles.cancelBtn}>Cancel</Button>
                    {onSubmit && <Button onClick={() => onSubmit()} className={styles.submitBtn}>Yes</Button>}
                </div>
            </div>
        </div>
    )
}