import {List, Section} from '@telegram-apps/telegram-ui';

import type { FC } from 'react';
import styles from "@/pages/IndexPage/IndexPage.module.scss";

export const Friends: FC = () => {

  return (
    <List>
        <Section>
            <div className={styles.container}>
                Soon.
            </div>
        </Section>
    </List>
  );
};
