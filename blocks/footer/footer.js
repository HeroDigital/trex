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

  const footerList = block.querySelectorAll('div')[0];
  const footerLists = block.querySelectorAll('div > .section:not(.footer-middle, .footer-bottom)');
  const footerMiddle = block.querySelectorAll('div > .section.footer-middle')[0];
  const footerBottom = block.querySelectorAll('div > .section.footer-bottom')[0];
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

  const footerCountryDropdown = `<div class="footer-country-dropdown">
    <label for="country">Country</label>
    <select name="country" id="country">
      <option value="default">Country</option>
      <option value="us">🇺🇸 United States</option>
      <option value="ca">🇨🇦 Canada</option>
      <option value="uk">🇬🇧 United Kingdom</option>
    </select>
    <p>By choosing your country, you acknowledge that you have read Trex's Privacy's Policy</p>
  </div>`;
  const footerForm = document.createElement('div');
  footerForm.className = 'footer-form';
  footerForm.innerHTML = footerCountryDropdown;
  footerMiddle.appendChild(footerForm);
  const footerExtras = document.createElement('div');
  footerExtras.className = 'footer-extras';
  footerList.appendChild(footerExtras);
  footerExtras.appendChild(footerMiddle);
  footerExtras.appendChild(footerBottom);
}
