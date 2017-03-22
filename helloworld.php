<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script>
  $(document).ready(function() {
    $.post( "https://echo-service-dot-pollin8-web-client-162107.appspot.com/_ah/api/echo/v1/echo/4", {"message":"echo"}, function( data ) {
      $('#blah').text(data.message)
    });
  });
</script>
<h1 id="blah"></h1>
<?php
  echo 'moreHello, world rofl!';
#$ch = curl_init();
#curl_setopt($ch, CURLOPT_URL, "https://echo-service-dot-pollin8-web-client-162107.appspot.com/_ah/api/echo/v1/echo/4");
#curl_setopt($ch, CURLOPT_POST, 1);
#curl_setopt($ch, CURLOPT_POSTFIELDS, '{"message":"echo"}');
#$result = curl_exec($ch);
#
#print_r($result);
#curl_close($ch);
echo 'end';
