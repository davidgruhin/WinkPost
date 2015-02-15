window.setInterval(function(){
//
//
$(".hideme").parent().hide();

$('.status:contains("operational")').parent('li').addClass('operational');
$('.status:contains("partial_outage")').parent('li').addClass('partialoutage');
$('.status:contains("investigating")').parent('li').addClass('investigating');


$('.status').each(function() {
    var $this = $(this);

    $this.text($this.text().replace(/_/g, ' '));
});
//
}, 1000);

