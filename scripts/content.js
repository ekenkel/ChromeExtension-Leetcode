const DEL_SELECTOR = '.mt-3.flex.items-center.space-x-4';
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
        if (n.matches(DEL_SELECTOR)) {
          stopped = true;
          mo.disconnect();
          n.remove();
        } else if (n.firstElementChild && n.querySelector(DEL_SELECTOR)) {
          stopped = true
          mo.disconnect();
          const el = n.querySelector(DEL_SELECTOR)
          toggle(el);
          el.appendChild(returnButton);
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
  toggle(document.querySelector(DEL_SELECTOR))
}

function toggle(parent) {
  for (const child of parent.children) {
    if (child.id !== 'CustomToggleBtn') {
      if (displayState) {
        child.style.display = '';
      } else {
        child.style.display = 'none';
      }
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

// Set an interval to check for changes and clear the timeout if any changes are found
const checkForChangesInterval = setInterval(() => {
  const el = document.querySelector(DEL_SELECTOR + " > div.flex.rounded");
  if (el) {
    clearInterval(checkForChangesInterval); // Clear the interval
    el.style.display = 'none';
  }
}, 100); // Check every 0.1 seconds for the "Problem completed" to appear