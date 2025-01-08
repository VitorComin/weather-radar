export function resetPageStyle() {
  const stars = document.getElementById("stars");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");

  if (stars) stars.style.opacity = "1";
  if (stars2) stars2.style.opacity = "1";
  if (stars3) stars3.style.opacity = "1";

  document.documentElement.classList.remove("daytime");
}
