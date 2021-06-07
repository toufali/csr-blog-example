import { appState } from '../app-state.js'
import { getPostDetail } from '../services/data.service.js'

const template = data => /*html*/ `
  <style>
    *{
      box-sizing: border-box;
      font: inherit;
      color: inherit;
    }

    :host{
      display: block;
      max-width: var(--max-width);
      margin: auto;
    }

    figure {
      position: relative;
      margin: 0;
      padding-bottom: 42%;
    }

    figure img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    header h1{
      margin-bottom: var(--space-sm);
      font-family: var(--title-font);
      font-size: var(--h1-size);
    }

    p{
      white-space: pre-wrap;
    }

    .details{
      display: inline-grid;
      grid-auto-flow: column;
      gap: var(--space-sm);
      align-items: center;
    }

    .details a,
    .details address{
      display: contents;
    }

    .details img{
      border-radius: 50%;
      width: 50px;
      height: 50px;
      object-fit: cover;
    }

    .details time::before{
      content: '▪';
      margin-right: var(--space-sm);
    }

  </style>
  <article>
    <figure>
      <img src="${data.image}" alt="Article image">
    </figure>
    <header>
      <h1>${data.title}</h1>
      <div class="details">
        <address>
          <a rel="author" href="${data.author.url}" target="_blank">
            <img src="${data.author.image}" alt="Author photo">
            <span>${data.author.displayName}</span>
          </a>
        </address>
        <time datetime="${data.published}">${data.published}</time>
      </div>
    </header>
    <p>${data.content}</p>
  </article>
`

class PostDetail extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    const data = await getPostDetail('./data.json', appState.detailId)

    this.shadowRoot.innerHTML = template(data)

    this.addEventListener('click', this)
  }

  handleEvent(e) {
    const target = e.composedPath()[0]

    console.log(e, target)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this)
  }
}

customElements.define('post-detail', PostDetail)
