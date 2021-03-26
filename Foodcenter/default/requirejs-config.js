var config = {
	"map": {
	    "*": {
	      "productListToolbarForm":"js/toolbar-custom",
	      "menu": "js/menu-custom"
	    }
	},
	paths: {
    	slick: 'js/bower_components/slick-carousel/slick/slick.min'

 	},
	shim: {
	    slick: {
	        deps: ['jquery']
	    }
	},
    deps: [
        "js/main",
    ],
	"config":{
        "mixins": {
            "Magento_Theme/js/view/messages": {
                "js/messages-custom":true
            }
        }
    }
};