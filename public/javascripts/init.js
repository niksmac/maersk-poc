$('.ui.dropdown')
  .dropdown()
;

jQuery("#addMore").on( "click", function() {
   jQuery.get('cargo', function(data){
        jQuery(".cargoInner").append(data);
    });
});
