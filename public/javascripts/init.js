$('.ui.dropdown')
  .dropdown()
;
$('.ui .step')
  .tab()
;
$('.menu .item')
  .tab()
;
jQuery("#addMore").on( "click", function() {
   jQuery.get('cargo', function(data){
        jQuery(".cargoInner").append(data);
    });
});
