/* eslint-disable */

/***
 * Yandex map module
 */
export class YandexMap {
    /***
     * Class constructor
     */
    constructor() {
        this.__initPos = {
            latitude: 55.753808,
            longitude: 37.620017
        };

    }

    /***
     * Render map
     * @param {boolean} searchControl - render searchControl
     * @param {boolean} geolocationControl - render geolocationControl
     * @param {boolean} userLocation - get user location on start
     * @param {boolean} listeners - add listeners to map
     * @param id
     * @param func
     */
    render({
               searchControl = false,
               geolocationControl = false,
               userLocation = false,
               listeners = false,
               id = 'ya-map'
           } = {},  callback = () => {}) {
        this.__init(id, callback);

        if (searchControl) {
            this.__initSearch();
        }

        if (geolocationControl) {
            this.__initGeolocationControl();
        }

        if (userLocation) {
            this.__getUserLocation();
        }

        if (listeners) {
            this.__addListeners();
        }
    }

    /***
     * Get point position
     * @returns {{latitude: number, longitude: number}}
     */
    getPointPos() {
        return this.__pos;
    }

    /***
     * Get position address
     * @returns {*}
     */
    getAddress() {
        return this.__text;
    }

    /***
     * Set map center
     * @param {{latitude: number, longitude: number}} pos - map center
     * @param {number} zoom - map zoom
     */
    setCenter(pos, zoom) {
        this.__myMap.setCenter(this.__convectPosObjectToArray(pos), zoom);
    }

    /***
     * Add point to map
     * @param {{latitude: number, longitude: number}} pos - point position
     */
    addPoint(pos) {
        this.__pos = pos;
        if (this.__pos !== undefined) {
            this.__deletePoint(this.__point);
            this.__point = this.__createPoint(pos);
        }
    }


    /***
     * Add circle to point on map
     * @param {{latitude: number, longitude: number}} pos - circle center
     * @param {number} radius - circle radius (m)
     * @param {number} measurementError - measurementError
     */
    addCircle(pos, radius, measurementError= 0) {
        this.__radius = radius;
        if (pos !== undefined) {
            this.__deleteCircle(this.__circle);
            pos.latitude += this.randomInRange(0.00001, measurementError);
            pos.longitude += this.randomInRange(0.00001, measurementError);
            this.__circle = this.__createCircle(pos, radius);
        }
    }

    randomInRange(min, max) {
        return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
    }

    /***
     * Add search input to map
     * @param {number} id - input id
     */
    addSearch(id) {
        const suggestView = new ymaps.SuggestView(id, {
            offset: [10, 10]
        });

        const self = this;
        suggestView.events.add('select', function (e) {
            console.log(e)
            const myGeocoder = ymaps.geocode(e.originalEvent.item.value);
            myGeocoder.then(
                function (res) {
                    self.__movePoint(self.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()));
                    self.setCenter(self.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates(), 1));
                },
                function (err) {
                    console.log('Ошибка', err);
                }
            );
        });
    }

    /***
     * Init map
     * @private
     */
    __init(id, callback = () => {}) {
        document.getElementById(id).innerHTML = '';
        this.callback = callback;
        this.__myMap = new ymaps.Map(id, {
            center: [this.__initPos.latitude, this.__initPos.longitude],
            zoom: 10,
            openBalloonOnClick: false,
            controls: []
        });

        this.__myMap.balloon.close();

        this.__initZoomControl();

        this.__myMap.events.add('balloonopen', () => {
            this.__myMap.balloon.close();
        });
    }

    /***
     * Init search on map
     * @private
     */
    __initSearch() {
        this.__searchControl = new ymaps.control.SearchControl({
            options: {
                provider: 'yandex#map',
                noPlacemark: true
            }
        });
        this.__myMap.controls.add(this.__searchControl);
    }

    /***
     * Init geolocation button on map
     * @private
     */
    __initGeolocationControl() {
        this.__geolocationControl = new ymaps.control.GeolocationControl({
            options: {
                layout: 'round#buttonLayout'
            }
        });
        this.__myMap.controls.add(this.__geolocationControl);
    }

    /***
     * Init zoom buttons on map
     * @private
     */
    __initZoomControl() {
        const zoomControl = new ymaps.control.ZoomControl({
            options: {
                layout: 'round#zoomLayout'
            }
        });
        this.__myMap.controls.add(zoomControl);
    }

    /***
     * Add listeners to map
     * @private
     */
    __addListeners() {
        this.__myMap.events.add('click', (e) => {
            const coords = e.get('coords');

            this.__movePoint(this.__convertPosArrayToObject(coords));
            this.__getAddress();
        });

        this.__myMap.geoObjects.events.add('click', (e) => {
            const coords = e.get('coords');

            this.__movePoint(this.__convertPosArrayToObject(coords));
            this.__getAddress();
        });

        if (this.__geolocationControl) {
            this.__geolocationControl.events.add('locationchange', (e) => {
                const coords = e.get('position');
                this.__movePoint(this.__convertPosArrayToObject(coords));
                this.__getAddress();
            });
        }

        if (this.__searchControl !== undefined) {
            this.__searchControl.events.add('resultselect', (e) => {
                const index = e.get('index');
                const coords = this.__searchControl.getResultsArray()[index].geometry.getCoordinates();
                this.__movePoint(this.__convertPosArrayToObject(coords));
                this.__text = this.__searchControl.getResultsArray()[index].properties.get('text');
            }, this);

        }
    }

    /***
     * Get user location and set map to this location
     * @private
     */
    __getUserLocation() {
        ymaps.geolocation.get({
            mapStateAutoApply: true
        }).then((result) => {
            this.__myMap.geoObjects.add(result.geoObjects);
            const coords = result.geoObjects.get(0).geometry.getCoordinates();
            this.__movePoint(this.__convertPosArrayToObject(coords));
        });
    }

    /***
     * Convert position from Array to Object
     * @param {number[]} coords - latitude and longitude
     * @returns {{latitude: number, longitude: number}}
     * @private
     */
    __convertPosArrayToObject(coords) {
        return {
            latitude: coords[0],
            longitude: coords[1]
        };
    }

    /***
     * Convert position from Object to Array
     * @param {{latitude: number, longitude: number}} pos - position
     * @returns {number[]}
     * @private
     */
    __convectPosObjectToArray(pos) {
        return [pos.latitude, pos.longitude];
    }

    /***
     * Get address by position
     * @private
     */
    __getAddress() {
        ymaps.geocode([this.__pos.latitude, this.__pos.longitude])
            .then((res) => {
                this.__text = res.geoObjects.get(0).properties.get('text');
                this.__city = res.geoObjects.get(0).properties.getAll().metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
                this.callback(this.__text);
            });
    }

   get city() {
        return this.__city;
    }
    /***
     * Move point to another position
     * @param {{latitude: number, longitude: number}} pos - point position
     * @private
     */
    __movePoint(pos) {
        this.addPoint(pos);
        this.addCircle(pos, this.__radius);
    }

    /***
     * Move point to another position
     * @param {{latitude: number, longitude: number}} pos - point position
     * @private
     */
    movePointByName(text) {
        const self = this;
        const myGeocoder = ymaps.geocode(text);
        myGeocoder.then(
            function (res) {
                self.setCenter(self.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates(), 3));
                self.addCircle(self.__convertPosArrayToObject(res.geoObjects.get(0).geometry.getCoordinates()), 1000, 0.001);
            },
            function (err) {
                console.log('Ошибка');
            }
        );
    }


    static async isAdressCorrect(adress) {
        const myGeocoder = ymaps.geocode(adress);
        return await  myGeocoder.then(
            function (res) {
                return res.geoObjects.get(0) !== undefined;
            }
        );
    }

    /***
     * Create point on map
     * @param {{latitude: number, longitude: number}} pos
     * @returns {ymaps.Placemark}
     * @private
     */
    __createPoint(pos) {
        const point = new ymaps.Placemark([pos.latitude, pos.longitude]);
        this.__myMap.geoObjects.add(point);
        return point;
    }

    /***
     * Delete point from map
     * @param {ymaps.Placemark} point - deleted point
     * @private
     */
    __deletePoint(point) {
        this.__myMap.geoObjects.remove(point);
    }

    /***
     * Create circle on map
     * @param {{latitude: number, longitude: number}} pos - circle center
     * @param {number} radius - circle radius
     * @returns {ymaps.Circle}
     * @private
     */
    __createCircle(pos, radius) {
        const circle = new ymaps.Circle([[pos.latitude, pos.longitude], radius]);
        this.__myMap.geoObjects.add(circle);

        return circle;
    }

    /***
     * Delete circle from map
     * @param {ymaps.Circle} circle - deleted circle
     * @private
     */
    __deleteCircle(circle) {
        this.__myMap.geoObjects.remove(circle);
    }
}