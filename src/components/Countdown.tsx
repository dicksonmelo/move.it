import { useState, useEffect } from "react";
import { fileURLToPath } from "url";
import styles from "../styles/components/Countdown.module.css";
import { GoCheck } from "react-icons/go"

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60; // sempre vai retornar os segundos como resto, pois é uma divisão real, então os décimos (segundos) não serão dividos
  const [hasFinished, setHasFinished] = useState(false);

  // .padStart vai conferir se a string tem 2 caracteres, senão, ele coloca o 0. Elimina a necessidade do if
  // desestruturando o array que é retornado com o .split
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]); // sempre que o estado 'active' mudar, a função será executada. E sempre que "time" mudar, também

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado <GoCheck style={{ borderRadius: '50%', backgroundColor: 'rgb(100, 220, 50)', marginLeft: '1.5rem', color: 'white' }} size={17} />
        </button>
      ) : isActive ? ( // Diego usou um fragment para envelopar esse conteúdo, mas acho que não precisa
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
        >
          Abandonar ciclo
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          {isActive ? "Abandonar Ciclo" : "Iniciar um ciclo"}
        </button>
      )}
    </div>
  );
}
