import { useWorlds } from '../../hooks/worlds';
import styles from './WorldsPage.module.scss';
import { WorldEntry } from './WorldEntry';

export function WorldsPage() {
    const { worlds, selectedWorldId } = useWorlds();

    return (
        <div className={styles.worlds_page}>
            <div className={styles.sidebar}>
                {worlds.map((world) => (
                    <WorldEntry
                        key={world.id}
                        id={world.id}
                        name={world.name}
                    />
                ))}
            </div>
            <div className={styles.mainframe}>
                this is the mainframe for id {selectedWorldId}
            </div>
        </div>
    );
}
