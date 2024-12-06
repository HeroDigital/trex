import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.append(a);
    while (row.firstElementChild) a.append(row.firstElementChild);
    [...a.children].forEach((div, index) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
        if (index === 1) {
          div.classList.add('first-image-card');
        }
      } else {
        div.className = 'cards-card-body';
        const link = div.querySelector('a');
        const h2 = div.querySelector('h2');
        const h3 = document.createElement('h3');
        h3.innerText = link ? link.innerText : '';
        div.querySelector('p').remove();
        if (h2) {
          div.append(h2);
        }
        div.append(h3);
        a.href = link ? link.href : '';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
