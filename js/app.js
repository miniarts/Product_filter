(function($, window) {
	"use strict";

    var obj = window.app || {},
        app = {
            init: function(){
                "use strict";

                $(document).ready(function() {
                	app.getData();
                    app.filter();
                });
            },
            getData: function(filters){
            	"use strict";

            	$.ajax({
            		type: 'POST', 
            		dataType: 'json',
        			contentType: "application/json",
        			url: 'js/products.json'
        		})
        		.done(function(jsondata){ 
        			var html = '',
        				productlist = jsondata;

        			$.each(productlist, function(i,product){
				      	
				      	html +='<li data-manufacturer="'+product.specs.manufacturer.substring(0,3).toUpperCase()+'" '+
				      	'data-storage="'+product.specs.storage +'" data-os="'+product.specs.os.substring(0,3).toUpperCase()+'" data-camera="'+product.specs.camera+'">' +
				      	'<a href="#" class="product-photo">' +
				      	'<img src="' + product.image.small + '" alt="'+product.name+'" height="130" /></a>' +
				      	'<h2><a href="#">'+ product.name +'</a></h2>'+
				      	'<ul class="product-description">' +
							'<li><span>Manufacturer: </span>'+ product.specs.manufacturer +'</li>'+
							'<li><span>Storage: </span>'+ product.specs.storage +'</li>'+
							'<li><span>OS: </span>'+ product.specs.os +'</li>'+
							'<li><span>Camera: </span>'+ product.specs.camera +'</li>'+
							'<li><span>Description: </span>'+product.description +
							'</ul>' +
						'<p class="product-price">'+ product.price +'</p></li>';
						
				    });
				    $('.products-list').html(html);
        		});

        		return false;
            },
            filter: function(){
            	"use strict";

				var $filters = $(".filters input[type='checkbox']"),
				  	$clear = $('#clear-filter');
				
				    $filters.on('click', function(){ 
				    	var $productList = $('.products-list'),
				    		$products = $('.products-list > li'),
				    		$filteredProducts = $('.products-list > li'),
					    	$filterCriteria = $('.filter-criteria');

				    	 	$products.hide();
				    	 	$('.msg').remove();
					    
					    $filterCriteria.each(function(){
					    	var $selectedFilters = $(this).find(':checked');

						    if ($selectedFilters.length) {
								var selectedFiltersValues = [];
								$.each($selectedFilters, function() {
									var currentFilter = $(this); 
									selectedFiltersValues.push("[data-" + currentFilter.closest('.filter-criteria').attr('id') + "='" + currentFilter.val().substring(0,3).toUpperCase() + "']");
									//console.log(selectedFiltersValues);
								});

								$filteredProducts = $filteredProducts.filter(selectedFiltersValues.join(','));
						     }
					    });

					    if($filteredProducts.length === 0){
							$productList.after('<div class="msg"><p>No matching product</p></div>');
						}else{
							$filteredProducts.show();
						}
				    });

				    $clear.on('click', function(){
				    	$filters.prop('checked', false);
				    	$products.show();
					});

				 return false;
            }
        };

    app.cache = obj.cache || {};

    app.init($);

    window.app = $.extend(obj, app);
}) (jQuery, window);

