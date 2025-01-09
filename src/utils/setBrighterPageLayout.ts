import { changeStarsShow } from "./changeStarsShow";

export function setBrighterPageLayout() {
  changeStarsShow(false);
  document.documentElement.classList.add("daytime");
}
