// <cs-icon name="arrow-right" size="18" stroke="1.75"> — renders a Lucide icon into shadow DOM (React never sees children)
(function () {
  const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
  class CsIcon extends HTMLElement {
    static get observedAttributes() { return ['name', 'size', 'stroke']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      const L = window.lucide;
      if (!L || !L.icons) { clearTimeout(this._t); this._t = setTimeout(() => this.render(), 60); return; }
      const node = L.icons[pascal(this.getAttribute('name') || 'circle')];
      const size = this.getAttribute('size') || '18';
      const style = document.createElement('style');
      style.textContent = ':host{display:inline-flex;flex:none;width:' + size + 'px;height:' + size + 'px}svg{display:block}';
      if (!node) { this.shadowRoot.replaceChildren(style); return; }
      const svg = L.createElement(node);
      svg.setAttribute('width', size); svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', this.getAttribute('stroke') || '1.75');
      svg.setAttribute('aria-hidden', 'true');
      this.shadowRoot.replaceChildren(style, svg);
    }
  }
  if (!customElements.get('cs-icon')) customElements.define('cs-icon', CsIcon);
})();
