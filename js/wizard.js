$(function() {	
	var openMealDataProviderURL = 'https://raw.githubusercontent.com/Orebrokommun/Open-Meal-Information/master/dataproviders.json';

	// Populate initial data provider drop down
  	var dataProiderXHR = $.getJSON(openMealDataProviderURL, function(response){  		
  		$.each(response.data, function(i, provider){
  			$('#openMealWizard #dataProviders').append(
    			$('<option />').text(provider.name)
    						   .val(provider.name)
    						   .attr('data-language', provider.lang)
    						   .attr('data-baseurl', provider.baseUrl)
    		);
  		})
  		$('#openMealWizard #dataProvidersContainer .loadingImage').hide();
  		$('#openMealWizard #dataProviders').show();  		
  	})
  	.fail(function() {
	    $('#openMealWizard #distributorsContainer .loadingImage').hide();
	    $('#openMealWizard #openMealWizard .alert').html('<strong>Error:</strong> Could not get data providers').show();
	});

  	// -- Event Listeners --

  	$('#openMealWizard #dataProviders').change(function(){
  		$('#openMealWizard #widgetCodeContainer').hide(); 			   				
		$('#openMealWizard #distributors').find("option:gt(0)").remove();
		$('#openMealWizard #distributors').hide();
		$('#openMealWizard .alert').hide();

  		var currentOption = $("#openMealWizard #dataProviders option:selected");
  		if (currentOption.val() == '') return;  	

  		$('#openMealWizard #distributorsContainer').show();	
  		$('#openMealWizard #distributorsContainer .loadingImage').show();
  		
  		// Populate distributor drop down
  		var distributorXHR = $.getJSON(currentOption.data('baseurl') + '/openmeal/v2/distributors.json', function(response){  		
  			$.each(response.data, function(i, distributor){
  				$('#openMealWizard #distributors').append(
    				$('<option />').text(distributor.name + ' (' + distributor.address.addressLocality + ')')
    						   	   .val(distributor.distributorID)
    						   	   .attr('data-language', distributor.lang)    						   	
    			);
  			})

  			$('#openMealWizard #distributorsContainer .loadingImage').hide();
  			$('#openMealWizard #distributors').show();    					
  		})
  		.fail(function() {
	    	$('#openMealWizard #distributorsContainer .loadingImage').hide();
	    	$('#openMealWizard .alert').html('<strong>Error:</strong> Could not get distributors from ' + currentOption.val()).show();
	  	});
  	});

  	$('#openMealWizard #distributors').change(function(){  		
  		$('#openMealWizard .alert').hide();

  		var currentOption = $("#openMealWizard #distributors option:selected");
  		if (currentOption.val() == '') return;

  		var currentProvider = $("#openMealWizard #dataProviders option:selected");  		
  		var openMealURL = currentProvider.data('baseurl') + '/openmeal/v2/meals.json?distributorID=' + currentOption.val();
  		var code = '<div id="openMealWidget" data-language="' + currentOption.data('language') + '" data-openmealurl="' + openMealURL + '"></div>\n' +  		
    			   '<script src="https://orebrokommun.github.io/Open-Meal-Information/js/widget.js" id="openMealWidgetScript" data-widgets="openMealWidget"></script>';

		$('#openMealWizard #openMealWidgetCode code').text(code);   		

		$('#openMealWizard #widgetCodeContainer').show(); 			   		
  	});
});