import {Header} from '../components/Header/Header.js';
import {HeaderController} from '../components/Header/HeaderController.js';

import {Navigation} from '../components/Navigation/Navigation.js';
import {NavigationController} from '../components/Navigation/NavigationController.js';

import {ProductCreateForm} from '../components/ProductCreateForm/ProductCreateForm.js';
import {ProductCreateFormController} from '../components/ProductCreateForm/ProductCreateFormController.js';

/***
 * @author Max Torzhkov
 * Class for product creation page
 * @class ProductCreate
 */
export class ProductCreate {
    /***
     * @author Max Torzhkov
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @constructor
     * @this {ProductCreate}
     * @public
     */
    constructor(parent) {
        this.__parent = parent;
    }

    /***
     * @author Max Torzhkov
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        // this.__headerController.removeControllerListeners();
        // this.__navigationController.removeControllerListeners();
        // this.__productCreateFormController.removeControllerListeners();
    }


    /***
     * @author Max Torzhkov
     *
     * array of categories
     * @return {string[]}
     * @private
     */
    __getOptionsCategories() {
        return [
            'Автомобиль',
            'Электроника',
            'Одежда',
            'Хобби',
            'Запчасти',
            'Спорт',
            'Животные',
            'Услуги'
        ];
    }


    /***
     * @author Max Torzhkov
     *
     * array of types
     * @return {string[]}
     * @private
     */
    __getOptionsType() {
        return [
            'Новое',
            'Б/у'
        ];
    }

    /***
     * @author Max Torzhkov
     *
     * Object of input fields
     * @return {Object} - fields of createForm
     * @private
     */
    __RegistrationForm() {
        return {
            name: {
                title: 'Название*',
                placeholder: 'Название товара',
                inputType: 'text',
                id: 'nameInput',
                dataAction: 'inputEmpty'
            },
            categories: {
                title: 'Категория*',
                placeholder: 'Категория',
                inputType: 'select',
                id: 'categorySelect',
                dataAction: 'inputEmpty',
                options: this.__getOptionsCategories()
            }, /*
            subCategories: {
                title: 'Подкатегория*',
                placeholder: 'Подкатегория',
                inputType: 'select',
                id: 'subcategorySelect',
                dataAction: 'inputEmpty',
                options: this.__getOptionsSubcategories()
            },*/
            type: {
                title: 'Тип*',
                placeholder: 'Тип',
                inputType: 'select',
                id: 'typeSelect',
                dataAction: 'inputEmpty',
                options: this.__getOptionsType()
            },
            price: {
                title: 'Цена*',
                placeholder: 'Цена (₽)',
                inputType: 'text',
                id: 'priceInput',
                dataAction: 'priceInput'
            },
            description: {
                title: 'Описание*',
                placeholder: 'Описание',
                inputType: 'textarea',
                id: 'textareaInput',
                dataAction: 'textareaInputEmpty'
            }/*,
            place: {
                title: 'Местоположение*',
                placeholder: 'Местоположение',
                inputType: 'text',
                id: 'placeInput',
                dataAction: 'inputEmpty'
            }*/
        };
    }

    /***
     * @author Max Torzhkov
     * Add component to parent
     * @this {ProductCreateForm}
     */
    async render() {
        this.__parent.innerHTML = '';

        this.__header = new Header(this.__parent);
        this.__headerController = new HeaderController(this.__removePageListeners.bind(this), this.__parent, this.__header);
        await this.__headerController.control();

        const navigation = new Navigation(this.__parent, 'Главная страница', {route: ['Создать объявление']});
        navigation.render();
        this.__navigationController = new NavigationController(this.__removePageListeners.bind(this), this.__parent, navigation);
        this.__navigationController.control();

        const productCreateForm = new ProductCreateForm(this.__parent, this.__RegistrationForm());
        productCreateForm.render();
        this.__productCreateFormController = new ProductCreateFormController(this.__removePageListeners.bind(this), this.__parent, productCreateForm);
        this.__productCreateFormController.control();
    }
}