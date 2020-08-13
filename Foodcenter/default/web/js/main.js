define(['jquery'],
function($) {

  "use strict";

    $(document).ready(function($){
        
        $('#switcher-language-trigger-nav').on('click',function(){
            mediaCheck({
                media: '(min-width: 768px)',
                // Switch to Desktop Version
                entry: function () {
                    $('html').removeClass('nav-before-open nav-open');
                }
            });  
        });

        if($('#toolbar-amount').length)
        $('.page-products .page-title-wrapper').append('<span class="amount">'+$('#toolbar-amount').data('amount')+'</span>');

        $('.toggle-description').on('click',function(e){
            e.preventDefault();
            $('.category-description').toggleClass('expanded');
        });

        $('.page.messages.initial').on('click',function(){
            $(this).find('.message').remove();
        });

        if($('.catalog-product-view').length){ 

            $('.qty .control').append('<div class="qty-button qty-up">+</div><div class="qty-button qty-down">-</div>');

            $('.qty .control').each(function() {
                var spinner = $(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.qty-up'),
                btnDown = spinner.find('.qty-down'),
                min = input.attr('min'),
                max = input.attr('max'),
                dataValidate = input.data('validate'),
                qtyIncrements = dataValidate['validate-item-quantity'].qtyIncrements ? dataValidate['validate-item-quantity'].qtyIncrements : 1;
                
                input.attr('readonly',true);

                btnUp.click(function() {
                    var oldValue = parseFloat(input.val());
                    if (oldValue >= max) {
                      var newVal = oldValue;
                    } else {
                      var newVal = oldValue + qtyIncrements;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });

                btnDown.click(function() {
                    var oldValue = parseFloat(input.val());
                    if (oldValue <= min) {
                      var newVal = oldValue;
                    } else {
                      var newVal = oldValue - qtyIncrements;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });
            });
        } 
    });

    return;
});
