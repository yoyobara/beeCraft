import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import styles from './LandingPage.module.scss';

export function LandingPage() {
    const navgiate = useNavigate();

    return (
        <div className={styles.landing_page}>
            <div className={styles.headline}>
                Start managing your worlds effortlessly
            </div>
            <div className={styles.subtext}>
                BeeCraft let's you manage known data about your worlds with ease
            </div>
            <div className={styles.buttons}>
                <Button
                    onClick={() => navgiate('/sign_up')}
                    variant="primary"
                    kind="contained"
                >
                    SIGN UP
                </Button>
                <Button
                    variant="primary"
                    kind="outlined"
                    onClick={() => navgiate('/sign_in')}
                >
                    SIGN IN
                </Button>
            </div>
        </div>
    );
}
