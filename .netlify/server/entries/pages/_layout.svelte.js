import { c as create_ssr_component } from "../../chunks/index2.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main id="${"app"}">${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
