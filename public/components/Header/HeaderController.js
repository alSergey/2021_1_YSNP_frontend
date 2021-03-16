import {Profile} from '../../pages/Profile.js';
import {Landing} from '../../pages/Landing.js';
import {ProductCreate} from '../../pages/ProductCreate.js';

import {Auth} from '../Auth/Auth.js';
import {AuthController} from '../Auth/AuthController.js';

import {user} from '../../models/SettingsUserData.js';

import {Map} from '../Map/Map.js';
import {MapController} from '../Map/MapController.js';

/***
 * Header controller controller
 */
export class HeaderController {
    /***
     * Class constructor
     * @param {Function} pageRemoveListeners - remove page listeners
     * @param {HTMLElement} parent - element callback will work with
     * @param {Header} header - header
     */
    constructor(pageRemoveListeners, parent, header) {
        this.__pageRemoveListeners = pageRemoveListeners;
        this.__parent = parent;
        this.__header = header;
        this.__model = user;
    }

    /***
     * Add listeners
     */
    async control() {
        await this.__model.update();
        this.__header.data = this.__model.getData();
        this.__header.render();

        this.__header.listeners = this.__createListeners();
        this.__header.addListeners();
    }

    /***
     * Remove listeners
     */
    removeControllerListeners() {
        this.__header.removeListeners();

        if (this.__authController !== undefined) {
            this.__authController.removeControllerListeners();
        }
    }

    /***
     * Header click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerHeaderClick(ev) {
        ev.preventDefault();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    ev.stopPropagation();

                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Dropdown click event
     * @param {MouseEvent} ev - event
     * @private
     */
    __listenerDropdownClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const actions = this.__getActions();
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined && 'action' in el.dataset) {
                    actions[el.dataset.action].open();
                }
            });
    }

    /***
     * Page click event
     * @private
     */
    __listenerPageClick() {
        document
            .getElementById('header-dropdown-content')
            .classList
            .add('header-dropdown-content_hidden');
    }

    /***
     * Get header listeners
     * @returns {{dropdownClick: {listener: *, type: string}, headerClick: {listener: *, type: string}}}
     * @private
     */
    __createListeners() {
        return {
            headerClick: {
                type: 'click',
                listener: this.__listenerHeaderClick.bind(this)
            },
            dropdownClick: {
                type: 'click',
                listener: this.__listenerDropdownClick.bind(this)
            },
            pageClick: {
                type: 'click',
                listener: this.__listenerPageClick.bind(this)
            }
        };
    }

    /***
     * Header brand click callback
     * @private
     */
    __openLanding() {
        this.__pageRemoveListeners();

        const landing = new Landing(this.__parent);
        landing.render();
    }

    /***
     * Header map click callback
     * @private
     */
    __openMap() {
        const map = new Map(this.__parent);
        map.render();
        this.__mapController = new MapController(this.__parent, map);
        this.__mapController.control();

        console.log('Open map');
    }

    /***
     * Header create product click callback
     * @private
     */
    __openCreateProduct() {
        if (this.__model.isAuth) {
            this.__pageRemoveListeners();

            const productCreate = new ProductCreate(this.__parent);
            productCreate.render();

            console.log('Open create product');
        } else {
            this.__openAuth();
        }
    }

    /***
     * Header account click callback
     * @private
     */
    __openAuth() {
        const auth = new Auth(this.__parent);
        auth.render();
        this.__authController = new AuthController(this.__pageRemoveListeners, this.__parent, auth);
        this.__authController.control();
    }

    /***
     * Header dropdown menu click callback
     * @private
     */
    __openDropdownMenu() {
        document
            .getElementById('header-dropdown-content')
            .classList
            .toggle('header-dropdown-content_hidden');
    }

    /***
     * Header profile click callback
     * @private
     */
    __openProfile() {
        this.__pageRemoveListeners();

        const settings = new Profile(this.__parent);
        settings.render();

        console.log('Open profile');
    }

    /***
     * Header my products click callback
     * @private
     */
    __openMyProducts() {
        // TODO(Sergey) release __openMyProducts
        // this.__pageRemoveListeners();

        console.log('Open my products');
    }

    /***
     * Header messages click callback
     * @private
     */
    __openMessages() {
        // TODO(Sergey) release __openMessages
        // this.__pageRemoveListeners();

        console.log('Open messages');
    }

    /***
     * Header favorites click callback
     * @private
     */
    __openFavorites() {
        // TODO(Sergey) release __openFavorites
        // this.__pageRemoveListeners();

        console.log('Open favorites');
    }

    /***
     * Header logout click callback
     * @private
     */
    __logout() {
        // TODO(Sergey) release __logout

        this.__model.logout()
            .then(({isLogout}) => {
                if (isLogout) {
                    this.__pageRemoveListeners();
                    const landing = new Landing(this.__parent);
                    landing.render();
                }
            });
    }

    /***
     * Get header actions
     * @returns {{favoritesClick: {open: *}, logoutClick: {open: *}, createProductClick: {open: *}, authClick: {open: *}, dropdownClick: {open: *}, locationClick: {open: *}, messagesClick: {open: *}, profileClick: {open: *}, brandClick: {open: *}, myProductsClick: {open: *}}}
     * @private
     */
    __getActions() {
        return {
            brandClick: {
                open: this.__openLanding.bind(this)
            },
            locationClick: {
                open: this.__openMap.bind(this)
            },
            createProductClick: {
                open: this.__openCreateProduct.bind(this)
            },
            authClick: {
                open: this.__openAuth.bind(this)
            },
            dropdownClick: {
                open: this.__openDropdownMenu.bind(this)
            },
            profileClick: {
                open: this.__openProfile.bind(this)
            },
            myProductsClick: {
                open: this.__openMyProducts.bind(this)
            },
            messagesClick: {
                open: this.__openMessages.bind(this)
            },
            favoritesClick: {
                open: this.__openFavorites.bind(this)
            },
            logoutClick: {
                open: this.__logout.bind(this)
            }
        };
    }
}