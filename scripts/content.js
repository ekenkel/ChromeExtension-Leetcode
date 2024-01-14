const panelSelector = 'div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5';

const content_selectors = [
  'div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.flex.items-start.justify-between.gap-4', // Title and Solved
  'div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.flex.gap-1', // Difficulty
  'div > div.flex-none', // Public likes, dislikes, comments
  'div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.mt-6.flex.flex-col.gap-3 > div.flex.flex-wrap.items-center', // Accepted, Submissions, Acceptance Rate
];

const elements = [];

let displayState = false;
const returnButton = document.createElement('button');
returnButton.textContent = 'Show Problem Details';
returnButton.id = 'CustomToggleBtn'
returnButton.classList = 'px-2 py-1 hover:text-blue-s dark:hover:text-dark-blue-s cursor-pointer rounded transition-colors text-gray-6 dark:text-dark-gray-6 hover:bg-fill-3 dark:hover:bg-dark-fill-3';
returnButton.addEventListener('click', eventToggler);

const mo = new MutationObserver(onMutation);
onMutation([{addedNodes: [document.documentElement]}]);
observe();

function onMutation(mutations) {
  let stopped;
  for (const {addedNodes} of mutations) {
    for (const n of addedNodes) {
      if (n.tagName) {
        const panelSection = n.querySelector(panelSelector)
        if (panelSection) {
          // Then we know the panel now exists and we can look for the other items
          stopped = true
          mo.disconnect();
          for (const selector of content_selectors) {
            const el = n.querySelector(selector)
            elements.push(el)
            toggleDisplayMode(el);
          }
          panelSection.insertBefore(returnButton, panelSection.querySelector('div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.elfjS'))
        }
      }
    }
  }
  if (stopped) observe();
}

function eventToggler() {
  displayState = !displayState
  if (displayState) {
    returnButton.textContent = 'Hide Problem Details';
  } else {
    returnButton.textContent = 'Show Problem Details';
  }
  toggleDisplayMode()
}

function toggleDisplayMode() {
  for (const el of elements) {
    if (displayState) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }
}

function observe() {
  // disconnect the observer if its already connected
  mo.disconnect();

  mo.observe(document, {
    subtree: true,
    childList: true,
  });
}