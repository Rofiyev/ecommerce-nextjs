import confetti from "canvas-confetti";

interface IDefault {
  startVelocity: number;
  spread: number;
  ticks: number;
  zIndex: number;
}

export const runFireworks = () => {
  var duration: number = 5 * 3000;
  var animationEnd: number = Date.now() + duration;
  var defaults: IDefault = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  var interval: NodeJS.Timeout = setInterval(() => {
    var timeLeft: number = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount: number = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};
