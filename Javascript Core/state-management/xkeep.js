export class XKeep {
  xkeepEl = [];
  constructor(xkeepObj) {
    this.xkeepObj = xkeepObj;
    this.init();
  }

  init() {
    // Scan through html for attributes begining with dots (.)
    this.pageScanner();

    // Attach event listener to all the elements
    this.xkeepEl.forEach((el) => {
      el.$el.addEventListener(el.event, async () => {
        if (el.action) {
          const actionToEval = this.xkeepObj?.actions?.[el.action];

          if (actionToEval?.beforeprocess) {
            actionToEval?.beforeprocess(el.$el);
          }

          if (actionToEval?.process) {
            await new Promise((resolve, reject) => {
              try {
                resolve(actionToEval?.process(el.$el));
              } catch (error) {
                console.error(error);
                reject(error);
              }
            }).finally(() => {
              if (actionToEval?.afterprocess) {
                actionToEval?.afterprocess(el.$el);
              }
            });
          }
        }
      });
    });
    console.log(this.xkeepEl, "I logged this");

    // if (this.xkeepObj.actions) {
    //     Object.keys(this.xkeepObj.actions).forEach((key) => {
    //         this[key] = this.xkeepObj.actions[key]
    //     })
    // }
  }

  pageScanner() {
    const elements = document.querySelectorAll("*");
    elements.forEach((element) => {
      const attributes = element.attributes;
      for (const attribute of attributes) {
        if (attribute.name.startsWith(".")) {
          const attributeName = attribute.name.replace(".", "");
          this.xkeepEl.push({
            $el: element,
            event: attributeName,
            action: element.getAttribute("." + attributeName),
          });
        }
      }
    });
  }
}

export const ref = (ref) => {
  return document.querySelector(`[ref='${ref}']`);
};
