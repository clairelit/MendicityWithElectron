$(document).ready(function(){
  $(".moreInfoDiv").click(function(){
    $(".moreInfoDiv").toggle();
    console.log("ready");
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
