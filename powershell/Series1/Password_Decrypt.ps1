

[CmdletBinding()]
PARAM([STRING[]]$Folder)
# password vault.
$vault = $Folder
# retrieve the password.
$securestring = convertto-securestring -string (get-content $vault)
$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securestring)
$passwsord = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
Write-host $passwsord -NoNewline -ForegroundColor Yellow
return $passwsord