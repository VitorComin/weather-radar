export function changeStarsShow(show: boolean) {
  const stars = document.getElementById("stars");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");
  const starsOpacity = show ? "1" : "0";

  if (stars) stars.style.opacity = starsOpacity;
  if (stars2) stars2.style.opacity = starsOpacity;
  if (stars3) stars3.style.opacity = starsOpacity;
}
