import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  const footerLists = block.querySelectorAll('div > .section');
  footerLists.forEach((list) => {
    // Find the default-content-wrapper element
    const defaultWrapper = list.querySelector('.default-content-wrapper');

    if (defaultWrapper) {
      // Create a new details element
      const details = document.createElement('details');
      details.setAttribute('open', '');

      // Move the content from default-content-wrapper to details
      details.innerHTML = defaultWrapper.innerHTML;

      // Find all p elements within the details
      const paragraphs = details.querySelectorAll('p');

      // Wrap each p element with a summary element
      paragraphs.forEach((p) => {
        const summary = document.createElement('summary');
        p.parentNode.insertBefore(summary, p);
        summary.appendChild(p);
      });

      // Replace the default-content-wrapper with the new details element
      defaultWrapper.parentNode.replaceChild(details, defaultWrapper);
    }
  });
}
