import styles from "@features/ScrambleVisualizer/ScrambleVisualizer.module.css";
import { DisplayCube } from "react-rubiks-cube-utils";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";

export default function ScrambleVisualizer() {
  const cube = useSelector((state: RootState) => state.scramble.cube);

  if (!cube) return <div className={styles.container}></div>;

  return (
    <div className={styles.container}>
      <div className={styles.fadeIn}>
        <DisplayCube cube={cube} size={28} />
      </div>
    </div>
  );
}
