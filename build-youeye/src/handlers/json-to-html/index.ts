import { createElement } from "./src/element";

export const createHTMLContent = (body: any) => {
  let html = "";

  for (let key in body) {
    html += createElement(key, body[key]);
  }

  return html;
};
