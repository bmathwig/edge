fetch("scrollbar.component.html")
    .then( stream => stream.text() )
    .then( text => define(text) )

const VARIATIONS = ['fluent', 'edge', 'onenote']
const THEMES = ['light', 'dark']
const MODES = ['expanded', 'collapsed']

function define(html) {
    class FluentScrollbar extends HTMLElement {
        constructor() {
            super();

            let shadow = this.attachShadow({ mode: 'open' });
            shadow.innerHTML = html;

            this._scrollbar = shadow.querySelector('#scrollbar');
            this._track = shadow.querySelector('#track');
            this._thumb = shadow.querySelector('#thumb-inner');

            this._scrollbar.style.display = 'none';
        }

        static get observedAttributes() {
            return ['mode', 'theme', 'variation', 'visible', 'outline'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'mode': this._setMode(newValue); break;
                case 'theme': this._setTheme(newValue); break;
                case 'variation': this._setVariation(newValue); break;
                case 'visible': this._setVisibility(newValue); break;
                case 'outline': this._setOutline(newValue); break;
            }
        }

        /**
         * Set the Theme of the Fluent Scrollbar (Light/Dark)
         * @param {string} theme
         */
        _setTheme(theme) {
            if (THEMES.indexOf(theme) === -1) {
                throw new Exception(`Unsupported Theme: ${theme}`);
            }

            THEMES.forEach( t => this._scrollbar.classList.remove(t) );

            this._scrollbar.classList.add(theme);
        }

        /**
         * Set the Mode of the Fluent Scrollbar (Expanded/Collapsed)
         * @param {string} mode 
         */
        _setMode(mode) {
            if (MODES.indexOf(mode) === -1) {
                throw new Exception(`Unsupported Mode: ${mode}`);
            }

            MODES.forEach( m => this._scrollbar.classList.remove(m) );

            this._scrollbar.classList.add(mode);
        }

        /**
         * Set the Variation of the Fluent Scrollbar (Fluent/Edge/OneNote)
         * @param {string} variation 
         */
        _setVariation(variation) {
            if (VARIATIONS.indexOf(variation) === -1) {
                throw new Exception(`Unsupported Variation: ${variation}`);
            }

            VARIATIONS.forEach( v => this._scrollbar.classList.remove(v) );

            this._scrollbar.classList.add(variation);
        }

        /**
         * Set the visibility of the Fluent Scrollbar (True/False)
         * @param {string} visible 
         */
        _setVisibility(visible) {
            if (visible === "true") {
                this._scrollbar.style.display = 'block';
            } else {
                this._scrollbar.style.display = 'none';
            }
        }

        /**
         * Set the width of the outline. Defaults to zero.
         * @param {string} width 
         */
        _setOutline(width) {
            this._thumb.style.borderWidth = `${width}px`;
        }

        set percent(percent) {
            this._thumb.style.top = `calc(${percent * 100}% - ${percent * 64}px)`;
        }
    }

    customElements.define('fluent-scrollbar', FluentScrollbar);
}