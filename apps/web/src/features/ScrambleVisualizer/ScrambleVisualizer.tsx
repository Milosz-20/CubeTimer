import styles from "@features/ScrambleVisualizer/ScrambleVisualizer.module.css";
import { DisplayCube } from "react-rubiks-cube-utils";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import { useEffect, useRef } from "react";

const colorMap: Record<string, string> = {
  white: "rgb(255, 255, 255)",
  yellow: "rgb(255, 255, 56)",
  green: "rgb(67, 255, 67)",
  blue: "rgb(36, 107, 253)",
  red: "rgb(255, 62, 62)",
  orange: "rgb(255, 152, 38)"
};

export default function ScrambleVisualizer() {
  const cube = useSelector((state: RootState) => state.scramble.cube);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cubeRef.current) return;
    const divs = cubeRef.current.querySelectorAll("div");
    divs.forEach((div) => {
      const bg = (div as HTMLDivElement).style.backgroundColor;
      if (colorMap[bg]) {
        (div as HTMLDivElement).style.backgroundColor = colorMap[bg];
      }
    });
  }, [cube]);

  if (!cube) return <div className={styles.container}></div>;

  return (
    <div className={styles.container}>
      <div className={styles.fadeIn} ref={cubeRef}>
        <DisplayCube cube={cube} size={28} />
      </div>
    </div>
  );
}
