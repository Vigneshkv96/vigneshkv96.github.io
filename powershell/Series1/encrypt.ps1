$path = $args[0]
$vault = $path

# the password.
$password = $args[1]

# save the password.
convertto-securestring -string $password -asplaintext -force | convertfrom-securestring | out-file $vault