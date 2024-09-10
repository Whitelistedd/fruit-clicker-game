import {Button} from "@/components/Button/Index.tsx";
import styles from "./ActionModal.module.scss"

interface Props {
    toggleModal: () => void;
    onSubmit: () => void;
    title: string
}

export const ActionModal = ({toggleModal, onSubmit, title}:Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <h1 className={"reset"}>{title}</h1>
                <div className={styles.buttons}>
                    <Button onClick={() => toggleModal()} className={styles.cancelBtn}>Cancel</Button>
                    <Button onClick={() => onSubmit()} className={styles.submitBtn}>Yes</Button>
                </div>
            </div>
        </div>
    )
}