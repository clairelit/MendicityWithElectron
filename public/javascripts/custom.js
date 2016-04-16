script(type='text/javascript', src='/javascripts/jquery-1.12.2.min.js')
  script.
$(document).ready(function(){
  $(".searchRow").click(function(){
    $(".moreInfoDiv").show();
    console.log("document is ready");
    });
  });

/*<script>
	document.addEventListener("keydown", function (e) {
		if (e.which === 123) {
			require('remote').getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});
</script>
*/
