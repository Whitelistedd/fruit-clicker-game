import Clipboard from '@/assets/svgs/ClipBoard.svg?react';
import Home from '@/assets/svgs/Home.svg?react';
import TwoPerson from '@/assets/svgs/TwoPerson.svg?react';
import { Link } from '@/components/Link/Link';

import styles from './ BottomNavMenu.module.scss';


export const BottomNavMenu = () => {
    const currentUrl = new URL(window.location.toString());

    const getUrlHref = (targetUrl: string) => {
        return new URL(targetUrl, window.location.toString())
    }

    return (
        <nav className={styles.nav}>
            <ul className={`${styles.list} reset`}>
                <li>
                    <Link className={`reset ${styles.listItem} ${currentUrl.href === getUrlHref("/#").href && styles.listItemActive}`} to='/'>
                        <Home />
                        <span className={styles.listItemText}>Home</span>
                    </Link>
                </li>
                <li >
                    <Link className={`reset ${styles.listItem} ${currentUrl.href === getUrlHref("/#cards").href  && styles.listItemActive}`} to='/cards'>
                        <Clipboard />
                        <span className={styles.listItemText}>Cards</span>
                    </Link>
                </li>
                <li >
                    <Link className={`reset ${styles.listItem} ${currentUrl.href === getUrlHref("/#friends").href  && styles.listItemActive}`} to='/friends'>
                        <TwoPerson />
                        <span className={styles.listItemText}>Friends</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}