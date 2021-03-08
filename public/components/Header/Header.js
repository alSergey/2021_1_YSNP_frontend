/***
 * Header component
 */
export class Header {
    /***
     * Class constructor
     * @param {HTMLElement} parent - element where the component will be inserted
     * @param {Object} data - element data
     * @param {Object} listeners - component listeners
     */
    constructor(parent, data = {}, listeners = {}) {
        this.__parent = parent;
        this.__data = data;
        this.__listeners = listeners;
    }

    /***
     * Get data
     * @returns {Object}
     */
    get data() {
        return this.__data;
    }

    /***
     * Set data
     * @param {Object} data - component data
     */
    set data(data) {
        this.__data = data;
    }

    /***
     * Get listeners
     * @returns {Object}
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * Set listeners
     * @param {Object} val - component listeners
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * Add component listeners
     */
    addListeners() {
        document
            .getElementById('header')
            .addEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.name !== undefined) {
            document
                .getElementById('header-dropdown')
                .addEventListener(this.__listeners.dropdownClick.type, this.__listeners.dropdownClick.listener);

            document
                .getElementById('app')
                .addEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Remove component listeners
     */
    removeListeners() {
        document
            .getElementById('header')
            .removeEventListener(this.__listeners.headerClick.type, this.__listeners.headerClick.listener);

        if (this.__data.name !== undefined) {
            document
                .getElementById('header-dropdown')
                .removeEventListener(this.__listeners.dropdownClick.type, this.__listeners.dropdownClick.listener);

            document
                .getElementById('app')
                .removeEventListener(this.__listeners.pageClick.type, this.__listeners.pageClick.listener);
        }
    }

    /***
     * Component HTML
     * @returns {string}
     * @private
     */
    __getTemplate() {
        return `
           <div class="header" id="header">
                    <div class="header-inner">
                        <div class="header-left">
                            <a class="header-left__brand" data-action="brandClick" href="/">
                                 <svg width="10vh" height="10vh" viewBox="0 0 86 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="82.5" cy="29.5" r="3.5" fill="#D31E1E"/>
                                    <path opacity="0.5" d="M4.09375 33V5.68359H6.83594V23.5781L15.0625 14.0859H18.6484L11.8984 21.6445L19.4219 33H16.1172L10.1406 23.543L6.83594 27.2344V33H4.09375ZM23.1484 23.543C23.1484 25.9336 23.6992 27.832 24.8008 29.2383C25.9023 30.6445 27.2734 31.3477 28.9141 31.3477C30.5312 31.3477 31.8906 30.6445 32.9922 29.2383C34.1172 27.832 34.6797 25.9336 34.6797 23.543C34.6797 21.1055 34.1172 19.1953 32.9922 17.8125C31.8672 16.4297 30.5078 15.7383 28.9141 15.7383C27.2969 15.7383 25.9258 16.4297 24.8008 17.8125C23.6992 19.1953 23.1484 21.1055 23.1484 23.543ZM20.4062 23.543C20.4062 20.6602 21.1445 18.2578 22.6211 16.3359C24.1211 14.4141 26.2188 13.4531 28.9141 13.4531C31.5859 13.4531 33.6719 14.4141 35.1719 16.3359C36.6719 18.2578 37.4219 20.6602 37.4219 23.543C37.4219 24.7617 37.2578 25.9453 36.9297 27.0938C36.625 28.2422 36.1445 29.3203 35.4883 30.3281C34.8555 31.3125 33.9648 32.1094 32.8164 32.7188C31.6914 33.3281 30.3906 33.6328 28.9141 33.6328C27.4609 33.6328 26.1602 33.3398 25.0117 32.7539C23.8867 32.1445 22.9961 31.3477 22.3398 30.3633C21.707 29.3555 21.2266 28.2773 20.8984 27.1289C20.5703 25.9805 20.4062 24.7852 20.4062 23.543ZM39.25 14.0859H42.4141L46.3164 25.1602C46.9023 26.8008 47.4297 28.3945 47.8984 29.9414H48.0391C48.3906 28.793 48.9062 27.1992 49.5859 25.1602L53.3125 14.0859H56.4062L48.25 36.1641C47.5469 38.0391 46.7266 39.3516 45.7891 40.1016C44.875 40.875 43.75 41.2617 42.4141 41.2617H41.3594V39.0117H41.9922C42.8828 39.0117 43.6328 38.7539 44.2422 38.2383C44.875 37.7227 45.4375 36.7969 45.9297 35.4609L46.6328 33.2461L39.25 14.0859ZM60.3086 28.1484C60.3086 29.0391 60.6836 29.8008 61.4336 30.4336C62.1836 31.043 63.2148 31.3477 64.5273 31.3477C66.1914 31.3477 67.6094 30.8086 68.7812 29.7305C69.9766 28.6523 70.5742 27.2812 70.5742 25.6172V22.9805C69.543 23.2383 67.9023 23.543 65.6523 23.8945C63.8242 24.2227 62.4766 24.7266 61.6094 25.4062C60.7422 26.0859 60.3086 27 60.3086 28.1484ZM57.5664 28.3594C57.5664 24.8438 60.2852 22.6641 65.7227 21.8203C68.1602 21.4219 69.7773 21.0938 70.5742 20.8359V19.7461C70.5742 18.5742 70.1523 17.6016 69.3086 16.8281C68.4648 16.0547 67.2695 15.668 65.7227 15.668C64.5977 15.668 63.5078 15.9375 62.4531 16.4766C61.4219 16.9922 60.543 17.6953 59.8164 18.5859L58.0586 17.1094C58.9961 16.0312 60.1211 15.1523 61.4336 14.4727C62.7695 13.793 64.1758 13.4531 65.6523 13.4531C70.7148 13.4531 73.2461 15.9258 73.2461 20.8711V33H70.6445V29.9062C70.2695 30.9141 69.4961 31.793 68.3242 32.543C67.1523 33.2695 65.7695 33.6328 64.1758 33.6328C62.0898 33.6328 60.4609 33.1406 59.2891 32.1562C58.1406 31.1719 57.5664 29.9062 57.5664 28.3594Z" fill="black"/>
                                 </svg>
                            </a>

                            <button class="header-left-location" data-action="locationClick">
                                <svg height="1vh" width="1vh" class="header-left-location__icon" viewBox="-119 -21 682 682.66669"  xmlns="http://www.w3.org/2000/svg"><path d="m216.210938 0c-122.664063 0-222.460938 99.796875-222.460938 222.460938 0 154.175781 222.679688 417.539062 222.679688 417.539062s222.242187-270.945312 222.242187-417.539062c0-122.664063-99.792969-222.460938-222.460937-222.460938zm67.121093 287.597656c-18.507812 18.503906-42.8125 27.757813-67.121093 27.757813-24.304688 0-48.617188-9.253907-67.117188-27.757813-37.011719-37.007812-37.011719-97.226562 0-134.238281 17.921875-17.929687 41.761719-27.804687 67.117188-27.804687 25.355468 0 49.191406 9.878906 67.121093 27.804687 37.011719 37.011719 37.011719 97.230469 0 134.238281zm0 0"/></svg>
                                <span class="header-left-location__name">Москва</span>
                            </button>
                        </div>
                        
                        <div class="header-right" id="header-right">
                            <button class="header-right__create-button" data-action="createProductClick">Разместить объявление</button>
                        </div>
                    </div>
            </div>
        `;
    }

    /***
     * Component HTML Auth
     * @returns {string}
     * @private
     */
    __getAuthTemplate() {
        return `
            <div class="header-dropdown" id="header-dropdown">
                <img class="header-dropdown__button" data-action="dropdownClick" src="${this.__data.linkImage}"/>
                <div class="header-dropdown-content header-dropdown-content_hidden" id="header-dropdown-content">
                    <div class="header-dropdown-content-inner">
                        <span class="header-dropdown-content__user">${this.__data.surname} ${this.__data.name}</span>
                        <div class="header-dropdown-content__separator"></div>
                        <a href="#" class="header-dropdown-content-item" data-action="profileClick">
                           <svg height="2vh" width="2vh" class="header-dropdown-content__logo" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)"  >
                                <path d="M2.83956 12.166C2.97493 12.1985 3.15874 12.3665 3.21181 12.5197L3.481 13.1729C3.54176 13.2983 3.53023 13.5467 3.45793 13.6659L2.38348 15.4335C2.15351 15.8127 2.2012 16.3498 2.51038 16.6981L3.42024 17.6129C3.73712 17.8961 4.29626 17.9472 4.66082 17.7251L6.41747 16.6439C6.52746 16.5758 6.76357 16.5518 6.92893 16.63L7.5773 16.8993C7.70805 16.945 7.87494 17.1292 7.90725 17.2654L8.38948 19.2807C8.49177 19.7079 8.89709 20.0592 9.33241 20.0995C9.33241 20.0995 9.59929 20.1242 9.99923 20.1242C10.3992 20.1242 10.6661 20.0995 10.6668 20.0995C10.8872 20.0733 11.0947 19.9813 11.2626 19.8354C11.4306 19.6894 11.5512 19.4962 11.609 19.2807L12.092 17.2654C12.1243 17.1299 12.2904 16.945 12.4427 16.8916L13.0918 16.6207C13.2064 16.5642 13.4718 16.5758 13.5818 16.6439L15.3384 17.7251C15.493 17.8203 15.6776 17.8706 15.8737 17.8706C16.1391 17.8706 16.3959 17.7769 16.5951 17.5982L17.5042 16.6826C17.6484 16.5114 17.7364 16.2996 17.7564 16.0762C17.7763 15.8528 17.7272 15.6286 17.6158 15.4343L16.5413 13.6666C16.469 13.5475 16.4575 13.299 16.5275 13.152L16.7951 12.4996C16.8405 12.368 17.0235 12.2001 17.1589 12.1676L19.1617 11.6823C19.3759 11.6239 19.5679 11.5024 19.7129 11.3333C19.8579 11.1642 19.9493 10.9553 19.9754 10.7335C19.9754 10.7335 20 10.4649 20 10.0625C20 9.66006 19.9754 9.39151 19.9754 9.39074C19.9492 9.16897 19.8578 8.96013 19.7128 8.79106C19.5678 8.62198 19.3759 8.50039 19.1617 8.44191L17.1597 7.95744C17.0243 7.92493 16.8405 7.75699 16.7874 7.60376L16.5182 6.95057C16.4575 6.8252 16.469 6.57677 16.5413 6.45758L17.6158 4.68995C17.8457 4.31073 17.798 3.77363 17.4888 3.42537L16.579 2.51059C16.2613 2.22657 15.7014 2.17549 15.3384 2.39838L13.5818 3.47954C13.4718 3.54687 13.2349 3.57241 13.0703 3.49347L12.4219 3.22415C12.2912 3.17849 12.1251 2.99429 12.0928 2.85808L11.6098 0.842798C11.5517 0.627215 11.4309 0.434035 11.2629 0.288113C11.0948 0.142192 10.8872 0.0502063 10.6668 0.0239916C10.6653 0.0247655 10.3984 0 9.99846 0C9.59852 0 9.33164 0.0247655 9.33087 0.0247655C9.11048 0.0510809 8.90294 0.143103 8.73492 0.289008C8.56689 0.434914 8.44606 0.628039 8.38794 0.843572L7.90648 2.85731C7.87417 2.99352 7.70728 3.17849 7.55499 3.23189L6.90586 3.50276C6.79049 3.55926 6.52592 3.54687 6.41594 3.47954L4.66005 2.39838C4.29626 2.17549 3.74865 2.21418 3.40332 2.5253L2.49423 3.44085C2.35011 3.61202 2.26205 3.8238 2.24209 4.04725C2.22212 4.27069 2.27124 4.49489 2.38271 4.68918L3.45716 6.45681C3.52946 6.57599 3.54099 6.82442 3.471 6.97147L3.20335 7.62388C3.15798 7.75545 2.97493 7.92339 2.83956 7.95589L0.836794 8.44114C0.62255 8.49953 0.43057 8.62109 0.285555 8.79018C0.14054 8.95927 0.0491252 9.16816 0.0230734 9.38996C0.0246116 9.38996 0 9.65851 0 10.061C0 10.4634 0.0246116 10.7319 0.0246116 10.7327C0.0507636 10.9545 0.142214 11.1633 0.287213 11.3324C0.432213 11.5015 0.624138 11.6231 0.838333 11.6815L2.83956 12.166ZM0.769112 10.061C0.769112 9.7065 0.789879 9.46736 0.790648 9.45962C0.802902 9.3994 0.830249 9.34333 0.870093 9.29673C0.909937 9.25014 0.960956 9.21456 1.0183 9.19339L3.02107 8.70814C3.40948 8.61372 3.80095 8.25617 3.92247 7.89785L4.17167 7.28877C4.34702 6.92735 4.32241 6.39644 4.11398 6.05282L3.03953 4.28597C2.988 4.20006 3.00262 4.0298 3.05338 3.97175L3.93093 3.08794C4.00092 3.02525 4.17936 3.00977 4.25934 3.05853L6.016 4.13969C6.34902 4.34478 6.91971 4.35871 7.22197 4.2078L7.82803 3.9555C8.20566 3.82471 8.56099 3.43078 8.65482 3.03918L9.13629 1.02467C9.15716 0.966779 9.19244 0.915246 9.23877 0.875002C9.28509 0.834757 9.3409 0.807148 9.40086 0.794815C9.40855 0.794815 9.64621 0.773919 9.99846 0.773919C10.3507 0.773919 10.5884 0.794815 10.5961 0.795589C10.6559 0.80792 10.7116 0.835438 10.7579 0.875531C10.8042 0.915625 10.8396 0.966962 10.8606 1.02467L11.3429 3.03918C11.4367 3.43001 11.7913 3.82471 12.1481 3.94699L12.7534 4.19774C13.1049 4.3711 13.6494 4.34401 13.9817 4.13969L15.7376 3.05853C15.8176 3.00977 16.0068 3.03531 16.0498 3.07246L16.9282 3.9555C16.9943 4.03057 17.0089 4.20006 16.9574 4.28597L15.8829 6.0536C15.6745 6.39644 15.6499 6.92813 15.8153 7.2671L16.066 7.87695C16.196 8.25695 16.5874 8.6145 16.9766 8.70892L18.9786 9.19339C19.0362 9.21439 19.0874 9.2499 19.1274 9.29651C19.1674 9.34312 19.1948 9.39928 19.207 9.45962C19.207 9.46736 19.2278 9.7065 19.2278 10.061C19.2278 10.4154 19.207 10.6545 19.2063 10.6623C19.194 10.7225 19.1667 10.7786 19.1268 10.8252C19.087 10.8718 19.036 10.9073 18.9786 10.9285L16.9759 11.4138C16.5874 11.5082 16.196 11.8657 16.0745 12.2241L15.8253 12.8331C15.6499 13.1946 15.6745 13.7255 15.8829 14.0691L16.9574 15.8359C17.0089 15.9218 16.9943 16.0921 16.9435 16.1502L16.066 17.034C16.0104 17.0758 15.9423 17.0973 15.8729 17.0951C15.8261 17.0966 15.7797 17.0857 15.7383 17.0634L13.9817 15.9822C13.6494 15.7779 13.0788 15.7632 12.7757 15.9141L12.1697 16.1664C11.792 16.2972 11.4367 16.6919 11.3436 17.0827L10.8614 19.0972C10.8405 19.1551 10.8053 19.2067 10.7589 19.2469C10.7126 19.2871 10.6568 19.3148 10.5968 19.3271C10.5884 19.3271 10.3507 19.348 9.99846 19.348C9.64621 19.348 9.40855 19.3271 9.40086 19.3263C9.34102 19.314 9.28529 19.2865 9.23899 19.2464C9.19268 19.2063 9.15733 19.1549 9.13629 19.0972L8.65405 17.0819C8.56022 16.6911 8.20489 16.2972 7.84879 16.1749L7.2435 15.9242C7.07138 15.8436 6.88337 15.8034 6.69359 15.8065C6.44055 15.8065 6.19982 15.8692 6.01523 15.983L4.25934 17.0641C4.17936 17.1129 3.98939 17.0866 3.94709 17.0502L3.06876 16.1664C3.00262 16.0913 2.988 15.9218 3.03953 15.8359L4.11398 14.0683C4.32241 13.7255 4.34702 13.1938 4.18166 12.8548L3.93093 12.245C3.80095 11.865 3.40948 11.5074 3.0203 11.413L1.0183 10.9285C0.960774 10.9075 0.909561 10.872 0.869567 10.8254C0.829573 10.7788 0.802135 10.7226 0.789878 10.6623C0.789878 10.6545 0.769112 10.4154 0.769112 10.061V10.061Z" fill="black"/>
                                <path d="M9.99843 14.3175C12.3311 14.3175 14.2285 12.4082 14.2285 10.0609C14.2285 7.71364 12.3311 5.80438 9.99843 5.80438C7.66571 5.80438 5.76831 7.71364 5.76831 10.0609C5.76831 12.4082 7.66571 14.3175 9.99843 14.3175ZM9.99843 6.5783C11.9066 6.5783 13.4594 8.14084 13.4594 10.0609C13.4594 11.981 11.9066 13.5436 9.99843 13.5436C8.09026 13.5436 6.53742 11.981 6.53742 10.0609C6.53742 8.14084 8.09026 6.5783 9.99843 6.5783Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <span>Профиль</span>
                        <a href="#" class="header-dropdown-content-item" data-action="myProductsClick">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.698 3.55594C19.5312 3.55594 19.3961 3.69113 19.3961 3.85789V17.8893C19.3961 18.7201 18.7202 19.3961 17.8893 19.3961H2.11066C1.27984 19.3961 0.603906 18.7202 0.603906 17.8893V2.11066C0.603906 1.27984 1.27984 0.603906 2.11066 0.603906H17.8893C18.7201 0.603906 19.3961 1.2798 19.3961 2.11066C19.3961 2.27742 19.5313 2.41262 19.698 2.41262C19.8648 2.41262 20 2.27742 20 2.11066C20 0.946836 19.0532 0 17.8893 0H2.11066C0.946836 0 0 0.946836 0 2.11066V17.8893C0 19.0532 0.946836 20 2.11066 20H17.8893C19.0532 20 20 19.0532 20 17.8893V3.85789C20 3.69113 19.8648 3.55594 19.698 3.55594Z" fill="black"/>
                                <path d="M4.84583 4.14026H4.17442C3.71348 4.14026 3.33844 4.51526 3.33844 4.97624V5.64768C3.33844 6.10862 3.71348 6.48362 4.17442 6.48362H4.84583C5.30676 6.48362 5.6818 6.10862 5.6818 5.64768V4.97624C5.6818 4.5153 5.30676 4.14026 4.84583 4.14026ZM5.07786 5.64768C5.07786 5.77561 4.97379 5.87968 4.84583 5.87968H4.17442C4.04649 5.87968 3.94239 5.77561 3.94239 5.64768V4.97624C3.94239 4.84831 4.04645 4.74421 4.17442 4.74421H4.84583C4.97376 4.74421 5.07786 4.84827 5.07786 4.97624V5.64768Z" fill="black"/>
                                <path d="M16.3596 5.00995H7.11928C6.95248 5.00995 6.81732 5.14514 6.81732 5.3119C6.81732 5.47866 6.95252 5.61385 7.11928 5.61385H16.3596C16.5264 5.61385 16.6615 5.47866 16.6615 5.3119C16.6615 5.14514 16.5264 5.00995 16.3596 5.00995Z" fill="black"/>
                                <path d="M4.84583 8.66534H4.17442C3.71348 8.66534 3.33844 9.04035 3.33844 9.50129V10.1727C3.33844 10.6337 3.71348 11.0087 4.17442 11.0087H4.84583C5.30676 11.0087 5.6818 10.6337 5.6818 10.1727V9.50129C5.6818 9.04035 5.30676 8.66534 4.84583 8.66534ZM5.07786 10.1727C5.07786 10.3007 4.97379 10.4048 4.84583 10.4048H4.17442C4.04649 10.4048 3.94239 10.3007 3.94239 10.1727V9.50129C3.94239 9.37336 4.04645 9.26929 4.17442 9.26929H4.84583C4.97376 9.26929 5.07786 9.37336 5.07786 9.50129V10.1727Z" fill="black"/>
                                <path d="M16.3596 9.53503H7.11928C6.95248 9.53503 6.81732 9.67023 6.81732 9.83698C6.81732 10.0037 6.95252 10.1389 7.11928 10.1389H16.3596C16.5264 10.1389 16.6615 10.0037 16.6615 9.83698C16.6615 9.67023 16.5264 9.53503 16.3596 9.53503Z" fill="black"/>
                                <path d="M4.84583 13.5164H4.17442C3.71348 13.5164 3.33844 13.8914 3.33844 14.3524V15.0238C3.33844 15.4848 3.71348 15.8598 4.17442 15.8598H4.84583C5.30676 15.8598 5.6818 15.4848 5.6818 15.0238V14.3524C5.6818 13.8914 5.30676 13.5164 4.84583 13.5164ZM5.07786 15.0238C5.07786 15.1517 4.97379 15.2558 4.84583 15.2558H4.17442C4.04649 15.2558 3.94239 15.1518 3.94239 15.0238V14.3524C3.94239 14.2244 4.04645 14.1203 4.17442 14.1203H4.84583C4.97376 14.1203 5.07786 14.2244 5.07786 14.3524V15.0238Z" fill="black"/>
                                <path d="M16.3596 14.3861H7.11928C6.95248 14.3861 6.81732 14.5213 6.81732 14.6881C6.81732 14.8548 6.95252 14.99 7.11928 14.99H16.3596C16.5264 14.99 16.6615 14.8548 16.6615 14.6881C16.6615 14.5213 16.5264 14.3861 16.3596 14.3861Z" fill="black"/>
                            </svg>
                            <span>Мои объявления</span>
                        </a>
                         <a href="#" class="header-dropdown-content-item" data-action="messagesClick">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.81082 8.10811C0.754322 8.10812 0.699244 8.09042 0.653326 8.0575C0.607409 8.02458 0.572962 7.9781 0.554828 7.92459C0.536694 7.87109 0.535784 7.81324 0.552226 7.75919C0.568668 7.70514 0.601636 7.65759 0.646496 7.62325L3.88974 5.1419C3.94679 5.0999 4.01805 5.08199 4.08818 5.09201C4.15831 5.10204 4.2217 5.13919 4.26471 5.19549C4.30772 5.25178 4.32691 5.32271 4.31814 5.393C4.30938 5.4633 4.27336 5.52735 4.21785 5.57136L0.974604 8.05244C0.92769 8.08864 0.870077 8.10822 0.81082 8.10811Z" fill="black"/>
                                <path d="M19.1892 19.4595H0.810798C0.739117 19.4595 0.670373 19.431 0.619688 19.3803C0.569002 19.3296 0.540527 19.2609 0.540527 19.1892V7.83784C0.540527 7.76616 0.569002 7.69741 0.619688 7.64673C0.670373 7.59604 0.739117 7.56757 0.810798 7.56757C0.882478 7.56757 0.951222 7.59604 1.00191 7.64673C1.05259 7.69741 1.08107 7.76616 1.08107 7.83784V18.9189H18.9189V7.83784C18.9189 7.76616 18.9474 7.69741 18.9981 7.64673C19.0488 7.59604 19.1175 7.56757 19.1892 7.56757C19.2609 7.56757 19.3296 7.59604 19.3803 7.64673C19.431 7.69741 19.4594 7.76616 19.4594 7.83784V19.1892C19.4594 19.2609 19.431 19.3296 19.3803 19.3803C19.3296 19.431 19.2609 19.4595 19.1892 19.4595Z" fill="black"/>
                                <path d="M10 14.5432C9.0504 14.5445 8.12997 14.2151 7.39677 13.6116L0.640009 8.04649C0.584672 8.0009 0.549711 7.9352 0.542818 7.86383C0.535925 7.79247 0.557664 7.72129 0.603252 7.66595C0.648841 7.61061 0.714545 7.57565 0.78591 7.56876C0.857275 7.56186 0.928456 7.5836 0.983793 7.62919L7.74055 13.1943C8.37738 13.7173 9.17593 14.0032 10 14.0032C10.8241 14.0032 11.6226 13.7173 12.2595 13.1943L19.0162 7.62919C19.0716 7.5836 19.1427 7.56186 19.2141 7.56876C19.2855 7.57565 19.3512 7.61061 19.3968 7.66595C19.4424 7.72129 19.4641 7.79247 19.4572 7.86383C19.4503 7.9352 19.4153 8.0009 19.36 8.04649L12.6033 13.6116C11.87 14.2151 10.9496 14.5445 10 14.5432Z" fill="black"/>
                                <path d="M19.1892 19.4594C19.1266 19.4594 19.0659 19.4376 19.0176 19.3978L12.1257 13.7221C12.0983 13.6996 12.0756 13.6718 12.0589 13.6405C12.0422 13.6091 12.0319 13.5748 12.0285 13.5395C12.0216 13.4681 12.0433 13.3969 12.0889 13.3416C12.1345 13.2863 12.2002 13.2513 12.2716 13.2444C12.3429 13.2375 12.4141 13.2593 12.4694 13.3049L19.3613 18.9805C19.4044 19.0159 19.4354 19.0638 19.4501 19.1175C19.4649 19.1712 19.4627 19.2282 19.4439 19.2806C19.425 19.333 19.3905 19.3784 19.3449 19.4104C19.2993 19.4424 19.2449 19.4595 19.1892 19.4594Z" fill="black"/>
                                <path d="M0.810804 19.4594C0.755093 19.4595 0.700719 19.4424 0.655124 19.4104C0.609529 19.3784 0.574942 19.333 0.556095 19.2806C0.537249 19.2282 0.535065 19.1712 0.549841 19.1175C0.564617 19.0638 0.595633 19.0159 0.638642 18.9805L7.53054 13.3049C7.58587 13.2593 7.65705 13.2375 7.72842 13.2444C7.79978 13.2513 7.86549 13.2863 7.91108 13.3416C7.95666 13.3969 7.9784 13.4681 7.97151 13.5395C7.96462 13.6109 7.92966 13.6766 7.87432 13.7221L0.982426 19.3978C0.934084 19.4376 0.873422 19.4594 0.810804 19.4594Z" fill="black"/>
                                <path d="M13.0646 3.42437C13.0053 3.42431 12.9476 3.40475 12.9005 3.36869L10 1.15112L7.09948 3.36869C7.04253 3.41224 6.97061 3.43137 6.89955 3.4219C6.82849 3.41242 6.7641 3.3751 6.72056 3.31815C6.67701 3.2612 6.65787 3.18928 6.66735 3.11822C6.67683 3.04716 6.71415 2.98278 6.7711 2.93923L9.83596 0.596257C9.88308 0.560268 9.94072 0.540771 10 0.540771C10.0593 0.540771 10.1169 0.560268 10.1641 0.596257L13.2289 2.93923C13.2745 2.97338 13.308 3.02102 13.3249 3.07538C13.3418 3.12973 13.341 3.18803 13.3228 3.24195C13.3046 3.29586 13.2699 3.34266 13.2235 3.37566C13.1771 3.40866 13.1215 3.42617 13.0646 3.42572V3.42437Z" fill="black"/>
                                <path d="M19.1892 8.10811C19.1299 8.10822 19.0723 8.08864 19.0254 8.05244L15.7822 5.57136C15.7267 5.52735 15.6907 5.4633 15.6819 5.393C15.6731 5.32271 15.6923 5.25178 15.7353 5.19549C15.7783 5.13919 15.8417 5.10204 15.9118 5.09201C15.982 5.08199 16.0532 5.0999 16.1103 5.1419L19.3535 7.62325C19.3984 7.65759 19.4314 7.70514 19.4478 7.75919C19.4642 7.81324 19.4633 7.87109 19.4452 7.92459C19.4271 7.9781 19.3926 8.02458 19.3467 8.0575C19.3008 8.09042 19.2457 8.10812 19.1892 8.10811Z" fill="black"/>
                                <path d="M15.946 10.7784C15.8743 10.7784 15.8055 10.7499 15.7549 10.6992C15.7042 10.6485 15.6757 10.5798 15.6757 10.5081V3.42433H4.32435V10.5081C4.32435 10.5798 4.29588 10.6485 4.24519 10.6992C4.19451 10.7499 4.12576 10.7784 4.05408 10.7784C3.9824 10.7784 3.91366 10.7499 3.86297 10.6992C3.81229 10.6485 3.78381 10.5798 3.78381 10.5081V3.15406C3.78381 3.08238 3.81229 3.01364 3.86297 2.96295C3.91366 2.91226 3.9824 2.88379 4.05408 2.88379H15.946C16.0177 2.88379 16.0864 2.91226 16.1371 2.96295C16.1878 3.01364 16.2162 3.08238 16.2162 3.15406V10.5081C16.2162 10.5798 16.1878 10.6485 16.1371 10.6992C16.0864 10.7499 16.0177 10.7784 15.946 10.7784Z" fill="black"/>
                                <path d="M13.7162 5.94593H6.28376C6.21208 5.94593 6.14333 5.91746 6.09265 5.86677C6.04196 5.81609 6.01349 5.74734 6.01349 5.67566C6.01349 5.60398 6.04196 5.53524 6.09265 5.48455C6.14333 5.43387 6.21208 5.4054 6.28376 5.4054H13.7162C13.7879 5.4054 13.8566 5.43387 13.9073 5.48455C13.958 5.53524 13.9865 5.60398 13.9865 5.67566C13.9865 5.74734 13.958 5.81609 13.9073 5.86677C13.8566 5.91746 13.7879 5.94593 13.7162 5.94593Z" fill="black"/>
                                <path d="M13.7162 7.9054H6.28376C6.21208 7.9054 6.14333 7.87693 6.09265 7.82625C6.04196 7.77556 6.01349 7.70682 6.01349 7.63514C6.01349 7.56346 6.04196 7.49471 6.09265 7.44403C6.14333 7.39334 6.21208 7.36487 6.28376 7.36487H13.7162C13.7879 7.36487 13.8566 7.39334 13.9073 7.44403C13.958 7.49471 13.9865 7.56346 13.9865 7.63514C13.9865 7.70682 13.958 7.77556 13.9073 7.82625C13.8566 7.87693 13.7879 7.9054 13.7162 7.9054Z" fill="black"/>
                                <path d="M13.7162 9.86488H6.28376C6.21208 9.86488 6.14333 9.8364 6.09265 9.78572C6.04196 9.73503 6.01349 9.66629 6.01349 9.59461C6.01349 9.52293 6.04196 9.45419 6.09265 9.4035C6.14333 9.35282 6.21208 9.32434 6.28376 9.32434H13.7162C13.7879 9.32434 13.8566 9.35282 13.9073 9.4035C13.958 9.45419 13.9865 9.52293 13.9865 9.59461C13.9865 9.66629 13.958 9.73503 13.9073 9.78572C13.8566 9.8364 13.7879 9.86488 13.7162 9.86488Z" fill="black"/>
                            </svg>
                            <span>Мои сообщения</span>
                        </a>
                         <a href="#" class="header-dropdown-content-item" data-action="favoritesClick">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0285 16.9771C9.86093 16.9774 9.69492 16.9446 9.54003 16.8806C9.38514 16.8165 9.24443 16.7225 9.12598 16.604L1.54886 9.02676C1.04094 8.51887 0.641817 7.91282 0.37585 7.24559C0.109883 6.57836 -0.0173544 5.86394 0.00190031 5.14591C0.021155 4.42788 0.186498 3.7213 0.487842 3.06928C0.789186 2.41727 1.22021 1.83348 1.75462 1.35354C2.26777 0.895885 2.86801 0.546498 3.51939 0.326308C4.17076 0.106117 4.85988 0.0196526 5.54546 0.0720925C6.93086 0.163506 8.23568 0.755867 9.21642 1.73864L10.0285 2.55048L11.0303 1.54873C11.5382 1.04085 12.1442 0.641761 12.8115 0.375816C13.4787 0.109872 14.1931 -0.017354 14.9111 0.00190041C15.6291 0.0211548 16.3357 0.186485 16.9877 0.487807C17.6397 0.789128 18.2235 1.22012 18.7035 1.7545C19.1612 2.26764 19.5106 2.86787 19.7308 3.51925C19.951 4.17062 20.0375 4.85974 19.9851 5.54534C19.8937 6.93076 19.3013 8.2356 18.3186 9.21638L10.9311 16.604C10.8126 16.7225 10.6719 16.8165 10.5171 16.8805C10.3622 16.9446 10.1962 16.9774 10.0286 16.9771H10.0285ZM5.19529 1.161C4.19901 1.14894 3.23375 1.5073 2.4867 2.16658C2.06267 2.54717 1.72063 3.01018 1.48147 3.52734C1.24231 4.04451 1.11104 4.60498 1.09567 5.17456C1.08029 5.74414 1.18114 6.31088 1.39206 6.84019C1.60297 7.3695 1.91953 7.85028 2.32241 8.2532L9.89954 15.8304C9.9338 15.8645 9.98018 15.8837 10.0285 15.8837C10.0769 15.8837 10.1233 15.8645 10.1575 15.8304L17.545 8.44283C19.2014 6.78649 19.3564 4.11455 17.8906 2.48667C17.51 2.06262 17.0469 1.72057 16.5298 1.48141C16.0126 1.24224 15.4521 1.11096 14.8825 1.09558C14.3129 1.08021 13.7462 1.18106 13.2169 1.39199C12.6876 1.60291 12.2068 1.91948 11.8038 2.32238L10.4154 3.71086C10.3646 3.76167 10.3043 3.80196 10.2379 3.82946C10.1715 3.85695 10.1004 3.8711 10.0286 3.8711C9.95675 3.8711 9.88562 3.85695 9.81926 3.82946C9.75289 3.80196 9.69259 3.76167 9.64181 3.71086L8.44295 2.51201C7.58133 1.65039 6.4138 1.16467 5.19529 1.16091V1.161Z" fill="black"/>
                            </svg>
                            <span>Избранное</span>
                        </a>
                        </a>
                        <div class="header-dropdown-content__separator"></div>
                         <a href="#" class="header-dropdown-content-item" data-action="logoutClick">
                            <svg height="2vh" width="2vh" class="header-dropdown-content__logo" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4298 0H3.57029C3.37395 0 3.21478 0.159166 3.21478 0.35551V19.6445C3.21478 19.8409 3.37387 20 3.57021 20H16.4297C16.6261 20 16.7852 19.8408 16.7852 19.6445V0.35551C16.7853 0.159166 16.6261 0 16.4298 0ZM3.92572 0.865393L9.64455 2.97322V17.0267L3.92572 19.1345V0.865393ZM16.0743 19.2891H5.56258L10.123 17.6082C10.2627 17.5567 10.3555 17.4235 10.3555 17.2747V2.7254C10.3555 2.57653 10.2627 2.44338 10.123 2.39182L5.56266 0.710942H16.0743V19.2891Z" fill="black"/>
                                <path d="M8.49036 8.76752C7.98362 8.76752 7.58661 9.30892 7.58661 10.0001C7.58661 10.6913 7.98362 11.2327 8.49036 11.2327C8.99717 11.2327 9.39411 10.6913 9.39411 10.0001C9.39411 9.30892 8.99717 8.76752 8.49036 8.76752ZM8.49028 10.5216C8.44398 10.5101 8.29755 10.3299 8.29755 10.0001C8.29755 9.67032 8.44398 9.49025 8.49028 9.47862C8.53665 9.49033 8.68317 9.67072 8.68317 10.0001C8.68317 10.3295 8.53665 10.5099 8.49028 10.5216Z" fill="black"/>
                            </svg>
                            <span>Выйти</span>
                        </a>
                    </div>
                </div>
            </div>          
        `;
    }

    /***
     * Component HTML NotAuth
     * @returns {string}
     * @private
     */
    __getNotAuthTemplate() {
        return `
            <svg height="4vh" width="4vh" class="header-right__account" data-action="authClick" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469-68.382812 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.636719-74.980469 181.019531 0 68.378906 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.636719 74.980469 181.019531 74.980469 68.378906 0 132.667969-26.628906 181.019531-74.980469 48.351563-48.351562 74.980469-112.640625 74.980469-181.019531 0-68.382812-26.628906-132.667969-74.980469-181.019531zm-308.679687 367.40625c10.707031-61.648438 64.128906-107.121094 127.660156-107.121094 63.535156 0 116.953125 45.472656 127.660156 107.121094-36.347656 24.972656-80.324218 39.613281-127.660156 39.613281s-91.3125-14.640625-127.660156-39.613281zm46.261718-218.519531c0-44.886719 36.515626-81.398438 81.398438-81.398438s81.398438 36.515625 81.398438 81.398438c0 44.882812-36.515626 81.398437-81.398438 81.398437s-81.398438-36.515625-81.398438-81.398437zm235.042969 197.710937c-8.074219-28.699219-24.109375-54.738281-46.585937-75.078125-13.789063-12.480469-29.484375-22.328125-46.359375-29.269531 30.5-19.894531 50.703125-54.3125 50.703125-93.363281 0-61.425782-49.976563-111.398438-111.402344-111.398438s-111.398438 49.972656-111.398438 111.398438c0 39.050781 20.203126 73.46875 50.699219 93.363281-16.871093 6.941406-32.570312 16.785156-46.359375 29.265625-22.472656 20.339844-38.511718 46.378906-46.585937 75.078125-44.472657-41.300781-72.355469-100.238281-72.355469-165.574219 0-124.617188 101.382812-226 226-226s226 101.382812 226 226c0 65.339844-27.882812 124.277344-72.355469 165.578125zm0 0"/></svg>
        `;
    }

    /***
     * Add component to parent
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);

        const accountTemplate = this.__data.name !== undefined ? this.__getAuthTemplate() : this.__getNotAuthTemplate();
        document.getElementById('header-right').insertAdjacentHTML('beforeend', accountTemplate);
    }
}
