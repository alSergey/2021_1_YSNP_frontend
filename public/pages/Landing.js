import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {ProductList} from '../components/ProductList/ProductList.js';
import {ProductListController} from '../components/ProductList/ProductListController.js';

/***
 * First (main) page
 */
export class Landing {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * Test header data
     * @returns {{location: string}}
     * @private
     */
    __getHeaderData() {
        return {
            location: 'Москва'
        };
    }

    /***
     * Test product list data
     * @returns {({date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string}|{date: string, img: string, amount: string, name: string, id: string})[]}
     * @private
     */
    __getProductListData() {
        return [
            {
                id: '1',
                img: '/img/test-productCart.jpg',
                name: 'Land Rover новый',
                date: '9 февраля 12:07',
                amount: '2 000 &#8381'
            },
            {
                id: '2',
                img: '/img/test-productCart.jpg',
                name: 'Игровой пк',
                date: '9 февраля 12:07',
                amount: '422 000 &#8381'
            },
            {
                id: '3',
                img: '/img/test-productCart.jpg',
                name: 'Дом прикольный',
                date: '9 февраля 12:07',
                amount: '760 000 &#8381'
            },
            {
                id: '4',
                img: '/img/test-productCart.jpg',
                name: 'Apple iphone x',
                date: '9 февраля 12:07',
                amount: '43 000 &#8381'
            },
            {
                id: '5',
                img: '/img/test-productCart.jpg',
                name: 'Honda Shadow Classic 400',
                date: '9 февраля 12:07',
                amount: '434 000 &#8381'
            }
        ];
    }

    /***
     * Add component to parent
     */
    render() {
        this.__parent.innerHTML = '';

        const header = new Header(this.__parent, this.__getHeaderData());
        this.__headerController = new HeaderController(this.__parent, header);
        this.__headerController.control();

        const productList = new ProductList(this.__parent, this.__getProductListData());
        this.__productListController = new ProductListController(this.__parent, productList);
        this.__productListController.control();
    }
}