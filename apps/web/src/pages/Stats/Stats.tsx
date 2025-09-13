import React from "react";
import styles from "./Stats.module.css";

const StatsPage: React.FC = () => {
  // Przykładowe dane dla demonstracji
  const mockSolves = [
    {
      time: "12.45",
      date: "2025-07-23",
      scramble: "R U R' U' R U2 R' U' R U R'"
    },
    {
      time: "15.67",
      date: "2025-07-23",
      scramble: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    },
    {
      time: "11.23",
      date: "2025-07-22",
      scramble: "R U2 R' U' R U' R' F R F' U R U' R'"
    },
    {
      time: "18.90",
      date: "2025-07-22",
      scramble: "F R U R' U' F' U R U' R' U R U2 R'"
    },
    {
      time: "13.45",
      date: "2025-07-21",
      scramble: "R U R' F' R U R' U' R' F R2 U' R'"
    },
    {
      time: "16.78",
      date: "2025-07-21",
      scramble: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    },
    {
      time: "10.98",
      date: "2025-07-20",
      scramble: "R U R' U R U2 R' U R U' R' U R U2 R'"
    },
    {
      time: "14.56",
      date: "2025-07-20",
      scramble: "F R U R' U' R U R' F' U' R U R' U' R' F R F'"
    }
  ];

  const averages = {
    ao5: "14.23",
    ao12: "15.45",
    ao50: "16.12",
    ao100: "16.89"
  };

  const bestTimes = {
    single: "10.98",
    ao5: "13.45",
    ao12: "14.23",
    ao50: "15.67"
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Statistics</h1>

      <div className={styles.statsGrid}>
        {/* Sekcja średnich */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Averages</h2>
          <div className={styles.averagesList}>
            <div className={styles.averageItem}>
              <span className={styles.averageLabel}>Ao5:</span>
              <span className={styles.averageTime}>{averages.ao5}s</span>
            </div>
            <div className={styles.averageItem}>
              <span className={styles.averageLabel}>Ao12:</span>
              <span className={styles.averageTime}>{averages.ao12}s</span>
            </div>
            <div className={styles.averageItem}>
              <span className={styles.averageLabel}>Ao50:</span>
              <span className={styles.averageTime}>{averages.ao50}s</span>
            </div>
            <div className={styles.averageItem}>
              <span className={styles.averageLabel}>Ao100:</span>
              <span className={styles.averageTime}>{averages.ao100}s</span>
            </div>
          </div>
        </div>

        {/* Sekcja najlepszych czasów */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Records</h2>
          <div className={styles.recordsList}>
            <div className={styles.recordItem}>
              <span className={styles.recordLabel}>Best single:</span>
              <span className={styles.recordTime}>{bestTimes.single}s</span>
            </div>
            <div className={styles.recordItem}>
              <span className={styles.recordLabel}>Best Ao5:</span>
              <span className={styles.recordTime}>{bestTimes.ao5}s</span>
            </div>
            <div className={styles.recordItem}>
              <span className={styles.recordLabel}>Best Ao12:</span>
              <span className={styles.recordTime}>{bestTimes.ao12}s</span>
            </div>
            <div className={styles.recordItem}>
              <span className={styles.recordLabel}>Best Ao50:</span>
              <span className={styles.recordTime}>{bestTimes.ao50}s</span>
            </div>
          </div>
        </div>

        {/* Wykres kołowy (mock) */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Time Distribution</h2>
          <div className={styles.chartContainer}>
            <div className={styles.pieChart}>
              <div
                className={styles.pieSlice}
                style={{
                  background: `conic-gradient(
                  var(--success) 0deg 108deg,
                  var(--success) 108deg 180deg,
                  var(--success) 180deg 252deg,
                  var(--error) 252deg 360deg
                )`
                }}
              ></div>
              <div className={styles.pieCenter}>
                <span className={styles.totalSolves}>{mockSolves.length}</span>
                <span className={styles.totalLabel}>solves</span>
              </div>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: "var(--success)" }}
                ></div>
                <span>&lt; 12s (30%)</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: "var(--success)" }}
                ></div>
                <span>12-15s (20%)</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: "var(--success)" }}
                ></div>
                <span>15-18s (20%)</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: "var(--error)" }}
                ></div>
                <span>&gt; 18s (30%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ostatnie solvy */}
        <div className={`${styles.section} ${styles.solvesSection}`}>
          <h2 className={styles.sectionTitle}>Recent Solves</h2>
          <div className={styles.solvesTable}>
            <div className={styles.tableHeader}>
              <span>Time</span>
              <span>Date</span>
              <span>Scramble</span>
            </div>
            {mockSolves.map((solve, index) => (
              <div key={index} className={styles.tableRow}>
                <span className={styles.timeCell}>{solve.time}s</span>
                <span className={styles.dateCell}>{solve.date}</span>
                <span className={styles.scrambleCell}>{solve.scramble}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.placeholder}>
        <p>
          💡 This is sample demonstration data. In the full version, your real
          Rubik's cube solving statistics will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default StatsPage;
