import styles from "./InfoPill.module.scss";

interface InfoPillProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelRight?: string;
  wrapClassName?: string;
  bottomRightLabel?: string;
  bottomLeftLabel?: string;
  wrapProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const InfoPill = ({
  children,
  className,
  label,
  labelRight,
  wrapClassName,
  bottomLeftLabel,
  bottomRightLabel,
  wrapProps,
  ...props
}: InfoPillProps) => {
  return (
    <div className={`${className} ${styles.container}`} {...props}>
      <div className={styles.topLabels}>
        <span>{label}</span>
        <span>{labelRight}</span>
      </div>
      <div {...wrapProps} className={wrapClassName || styles.infoWrap}>{children}</div>
        {(bottomLeftLabel || bottomRightLabel) && <div className={styles.topLabels}>
            <span>{bottomLeftLabel}</span>
            <span>{bottomRightLabel}</span>
        </div>}
    </div>
  );
};
