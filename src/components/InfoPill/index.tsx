import styles from "./InfoPill.module.scss";

interface InfoPillProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelRight?: string;
  wrapClassName?: string;
}

export const InfoPill = ({
  children,
  className,
  label,
  labelRight,
  wrapClassName,
  ...props
}: InfoPillProps) => {
  return (
    <div className={`${className} ${styles.container}`} {...props}>
      <div className={styles.topLabels}>
        <span>{label}</span>
        <span>{labelRight}</span>
      </div>
      <div className={`${wrapClassName} ${styles.infoWrap}`}>{children}</div>
    </div>
  );
};
