import { changeStarsShow } from "./changeStarsShow";

export function resetPageStyle() {
  changeStarsShow(true);
  document.documentElement.classList.remove("daytime");
}
