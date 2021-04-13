import {Header} from '../components/Header/Header.js';
import {Auth} from '../components/Auth/Auth.js';
import {Map} from '../components/Map/Map.js';
import {Footer} from '../components/Footer/Footer';
import {PageOffline} from '../components/PageOffline/PageOffline';

/***
 * Application base view
 */
export class BaseView {
    /***
     * Class constructor
     * @param {HTMLElement} app - parent element
     */
    constructor(app) {
        this.__app = app;
    }

    /***
     * Get view context
     * @returns {Object}
     */
    get baseContext() {
        return this.__baseContext;
    }

    /***
     * Set view context
     * @param {Object} baseContext - view context
     */
    set baseContext(baseContext) {
        this.__baseContext = baseContext;
    }

    /***
     * Render auth component
     */
    renderAuth() {
        this.__auth = new Auth(this.__app);
        this.__auth.render(this.__baseContext.auth);
    }

    /***
     * Get user telephone from auth component
     * @returns {string}
     */
    getTelephone() {
        return this.__auth.getTelephone();
    }

    /***
     * Get user password from auth component
     * @returns {string}
     */
    getPassword() {
        return this.__auth.getPassword();
    }

    /***
     * Set auth component error message
     * @param str
     */
    authErrorText(str) {
        this.__auth.errorText(str);
    }

    /***
     * Remove auth component
     */
    removeAuth() {
        this.__auth.remove();
    }

    /***
     * Open map component
     */
    renderMap() {
        this.__map = new Map(this.__app);
        this.__map.render(this.__baseContext.map);
    }

    /***
     * Update map context
     * @param {Object} context - map context
     */
    updateMapContext(context) {
        this.__baseContext.map.data.radius = context.radius;
    }

    /***
     * Remove map component
     */
    removeMap() {
        this.__map.remove();
    }

    /***
     * Open / Close dropdown menu
     */
    toggleDropdown() {
        this.__header.toggleDropdown();
    }

    /***
     * Remove dropdown menu
     */
    removeDropdown() {
        this.__header.removeDropdown();
    }

    /***
     * Remove header listeners
     */
    removeHeaderListeners() {
        if (this.__header) {
            this.__header.removeListeners();
        }
    }

    /***
     * Update user address
     * @param address
     */
    updateAddress(address) {
        this.__header.updateAddress(address);
    }

    /***
     * Render offline
     */
    renderOffline() {
        this.__app.innerHTML = '';

        const offline = new PageOffline(this.__app);
        offline.render();
    }

    /***
     * Render view
     */
    render() {
        this.__app.innerHTML = '';

        this.__header = new Header(this.__app);
        this.__header.render(this.__baseContext.header);
    }

    /***
     * Render footer
     */
    renderFooter() {
        this.__footer = new Footer(this.__app);
        this.__footer.render(this.__baseContext.header);
    }
}
