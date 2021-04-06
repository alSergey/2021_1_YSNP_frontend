import {BasePresenter} from './BasePresenter.js';
import {ProductListModel} from '../models/ProductListModel.js';

import {router} from '../modules/router';
import {frontUrls} from '../modules/frontUrls';

import {EndlessScroll} from '../modules/endlessScroll.js';
import {PageUpHandler} from '../modules/pageUpHandler.js';
import {eventHandlerWithDataType} from '../modules/eventHandler.js';

/***
 * Main view
 */
export class MainPresenter extends BasePresenter {
    /***
     * Class constructor
     * @param {MainView} view - view
     */
    constructor(view) {
        super(view);
        this.__view = view;
        this.__productListModel = new ProductListModel();
        (new EndlessScroll(this.__createListeners().scroll)).start();
    }

    /***
     * Update view data
     * @returns {Promise<void>}
     */
    async update() {
        return super.update()
            .then(() => this.__productListModel.update())
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    /***
     * Control view
     * @returns {Promise<void>}
     */
    async control() {
        await this.update();

        this.__view.render(this.__makeContext());
        (new PageUpHandler()).start();
    }

    /***
     * Product List click event
     * @param {MouseEvent} ev - event
     */
    __listenerProductListClick(ev) {
        ev.preventDefault();

        let id = undefined;
        let action = undefined;
        Object
            .entries(ev.composedPath())
            .forEach(([, el]) => {
                if (el.dataset !== undefined) {
                    if ('action' in el.dataset && action === undefined) {
                        action = el.dataset.action;
                    }

                    if ('cardId' in el.dataset) {
                        id = el.dataset.cardId;
                    }
                }
            });

        if (action !== undefined) {
            const actions = this.__getActions().productList;
            actions[action].open(id);
        }
    }

    /***
     * Listener on scroll end
     * @returns {Promise<void>}
     * @private
     */
    async __scrollEnd() {
        this.__productListModel.updateNewData()
            .then(() => {
                this.__view.addNewCards(this.__productListModel.newData);
            })
            .catch((err) => {
                //TODO(Sergey) нормальная обработка ошибок
                console.log(err.message);
            });
    }

    __listenerSearchClick(dataType, actions, ev) {
        ev.preventDefault();
        eventHandlerWithDataType(ev, dataType, actions, true);
    }

    /***
     * Get view listeners
     * @returns {{productList: {productCardClick: {listener: *, type: string}}}}
     * @private
     */
    __createListeners() {
        return {
            productList: {
                productCardClick: {
                    type: 'click',
                    listener: this.__listenerProductListClick.bind(this)
                }
            },
            search: {
                searchClick: {
                    type: 'click',
                    listener: this.__listenerSearchClick.bind(this, 'action', this.__getActions().search)
                }
            },
            scroll: {
                scrollEnd: this.__scrollEnd.bind(this)
            }
        };
    }

    /***
     * Like card callback
     * @param {string} id - product card id
     * @private
     */
    __likeCard(id) {
        // TODO(Sergey) release __likeCard

        const numberId = parseInt(id, 10);
        this.__view.likeProduct(numberId);
    }

    /***
     * Open card callback
     * @param {string} id - product card id
     * @private
     */
    __openCard(id) {
        const numberId = parseInt(id, 10);
        router.redirect(frontUrls.product(numberId));
    }

    /***
     * Get product list actions
     * @returns {{productList: {likeClick: {open: *}, cardClick: {open: *}}}}
     * @private
     */
    __getActions() {
        return {
            productList: {
                cardClick: {
                    open: this.__openCard.bind(this)
                },
                likeClick: {
                    open: this.__likeCard.bind(this)
                }
            },
            search: {
                searchButtonClick: {
                    open: this.__searchButton.bind(this)
                }
            }
        };
    }

    __searchButton() {
        alert('asd');
      router.redirect(frontUrls.search);
    }

    /***
     * Make view context
     * @returns {{productList: {data: *[], listeners: {productCardClick: {listener: *, type: string}}}}}
     * @private
     */
    __makeContext() {
        return {
            productList: {
                data: this.__productListModel.getData(),
                listeners: this.__createListeners().productList
            },
            search: {
                data: null,
                listeners: this.__createListeners().search
            }
        };
    }
}