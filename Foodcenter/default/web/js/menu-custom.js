define([
    'jquery',
    'jquery/ui',
    'mage/menu'],
    function($){
        $.widget('foodcenter.menu', $.mage.menu, {

            _openMenuDesktop: function() {
                $('#toggle-link').on('click',function(e){
                    e.preventDefault();
                    if(!$('html').hasClass('nav-before-open nav-open')) {
                        $('html').addClass('nav-before-open nav-open');
                    } else {
                        $('html').removeClass('nav-before-open nav-open');
                    }
                });
            },
            _openSubMenuDesktop: function() {
                // Open Submenu 
                $('a.level-top').on('click',function(e){
                    if($(this).next('.submenu').length) {
                        e.preventDefault();
                        $('.navigation').toggleClass('submenu-active');
                        $(this).closest('li').toggleClass('submenu-active');
                    }
                });

            },
            _allCat: function() {
                subMenus = this.element.find('.level-top');
                $.each(subMenus, $.proxy(function (index, item) {
                    var category = $(item).find('> a span').not('.ui-menu-icon').text(),
                        categoryUrl = $(item).find('> a').attr('href'),
                        menu = $(item).find('> .ui-menu');

                    this.categoryLink = $('<a>')
                        .attr('href', categoryUrl)
                        .text($.mage.__('All ')+' '+category);

                    this.categoryParent = $('<li>')
                        .addClass('ui-menu-item all-category')
                        .html(this.categoryLink);

                    if (menu.find('.all-category').length === 0) {
                        menu.append(this.categoryParent);
                    }

                }, this));
            },
            _toggleMobileMode: function () {
                var subMenus;

                $(this.element).off('mouseenter mouseleave');
                this._on({

                    /**
                     * @param {jQuery.Event} event
                     */
                    'click .ui-menu-item:has(a)': function (event) {
                        var target;

                        event.preventDefault();
                        target = $(event.target).closest('.ui-menu-item');
                        target.get(0).scrollIntoView();

                        if (!target.hasClass('level-top') || !target.has('.ui-menu').length) {
                            window.location.href = target.find('> a').attr('href');
                        }
                    },

                    /**
                     * @param {jQuery.Event} event
                     */
                    'click .ui-menu-item:has(.ui-state-active)': function (event) {
                        this.collapseAll(event, true);
                    }
                });


            },
            _init: function () {
                this._super();

                if (this.options.expanded === true) {
                    this.isExpanded();
                }
                if (this.options.responsive === true) {
                    mediaCheck({
                        media: this.options.mediaBreakpoint,
                        entry: $.proxy(function () {
                            this._toggleMobileMode();
                        }, this),
                        exit: $.proxy(function () {
                            this._toggleDesktopMode();
                        }, this)
                    });
                }

                this._allCat();
                this._openMenuDesktop();
                this._openSubMenuDesktop();
                
                //  mediaCheck({
                //     media: '(min-width: 768px)',
                //     entry: $.proxy(function () {
                        
                        
                //     }, this)
                // });

                this._assignControls()._listen();
                this._setActiveMenu();

            }
    });
    return $.foodcenter.menu;
    });
