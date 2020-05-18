/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'jquery-ui-modules/widget',
    'Magento_Catalog/js/product/list/toolbar'
], function ($) {
    'use strict';

    /**
     * ProductListToolbarForm Widget - this widget is setting cookie and submitting form according to toolbar controls
     */
    $.widget('foodcenter.toolbar', $.mage.productListToolbarForm, {

        _init: function () {
            console.log('foodcenter.toolbar');
        },
        
        /**
         * @param {jQuery.Event} event
         * @private
         */
        _processSelect: function (event) {
            this.changeUrl(
                event.data.paramName,
                event.currentTarget.options[event.currentTarget.selectedIndex].value,
                event.data.default,
                $(event.currentTarget.options[event.currentTarget.selectedIndex]).data('direction')
            );
        },

        /**
         * @param {String} paramName
         * @param {*} paramValue
         * @param {*} defaultValue
         */
        changeUrl: function (paramName, paramValue, defaultValue, dataDirection) {
            var decode = window.decodeURIComponent,
                urlPaths = this.options.url.split('?'),
                baseUrl = urlPaths[0],
                urlParams = urlPaths[1] ? urlPaths[1].split('&') : [],
                paramData = {},
                parameters, i, form, params, key, input, formKey;

            for (i = 0; i < urlParams.length; i++) {
                parameters = urlParams[i].split('=');
                paramData[decode(parameters[0])] = parameters[1] !== undefined ?
                    decode(parameters[1].replace(/\+/g, '%20')) :
                    '';
            }
            paramData[paramName] = paramValue;

            if(dataDirection.length)
            paramData[this.options.direction] = dataDirection;

            if (this.options.post) {
                form = document.createElement('form');
                params = [this.options.mode, this.options.direction, this.options.order, this.options.limit];

                for (key in paramData) {
                    if (params.indexOf(key) !== -1) { //eslint-disable-line max-depth
                        input = document.createElement('input');
                        input.name = key;
                        input.value = paramData[key];
                        form.appendChild(input);
                        delete paramData[key];
                    }
                }
                formKey = document.createElement('input');
                formKey.name = 'form_key';
                formKey.value = this.options.formKey;
                form.appendChild(formKey);

                paramData = $.param(paramData);
                baseUrl += paramData.length ? '?' + paramData : '';

                form.action = baseUrl;
                form.method = 'POST';
                document.body.appendChild(form);
                form.submit();
            } else {
                if (paramValue == defaultValue) { //eslint-disable-line eqeqeq
                    delete paramData[paramName];
                }
                paramData = $.param(paramData);
                location.href = baseUrl + (paramData.length ? '?' + paramData : '');
            }
        }
    });

    return $.foodcenter.toolbar;
});
