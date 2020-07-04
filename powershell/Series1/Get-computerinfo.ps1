

################### Last Login Info ############################################# 
function LastLoginInfo()
{ 
$adsi = ([ADSI]"WinNT://$env:COMPUTERNAME").Children | where {$_.SchemaClassName -eq 'user'} | Select-Object name,lastlogin ,UserFlags
$login = @()
#$loginInfo = New-Object 'system.collections.generic.dictionary[string,string]'
Function Convert-UserFlag  {

  Param ($UserFlag)

  $List = New-Object System.Collections.ArrayList

  Switch  ($UserFlag) {

  ($UserFlag  -BOR 0x0001)  {[void]$List.Add('SCRIPT')}

  ($UserFlag  -BOR 0x0002)  {[void]$List.Add('ACCOUNTDISABLE')}

  ($UserFlag  -BOR 0x0008)  {[void]$List.Add('HOMEDIR_REQUIRED')}

  ($UserFlag  -BOR 0x0010)  {[void]$List.Add('LOCKOUT')}

  ($UserFlag  -BOR 0x0020)  {[void]$List.Add('PASSWD_NOTREQD')}

  ($UserFlag  -BOR 0x0040)  {[void]$List.Add('PASSWD_CANT_CHANGE')}

  ($UserFlag  -BOR 0x0080)  {[void]$List.Add('ENCRYPTED_TEXT_PWD_ALLOWED')}

  ($UserFlag  -BOR 0x0100)  {[void]$List.Add('TEMP_DUPLICATE_ACCOUNT')}

  ($UserFlag  -BOR 0x0200)  {[void]$List.Add('NORMAL_ACCOUNT')}

  ($UserFlag  -BOR 0x0800)  {[void]$List.Add('INTERDOMAIN_TRUST_ACCOUNT')}

  ($UserFlag  -BOR 0x1000)  {[void]$List.Add('WORKSTATION_TRUST_ACCOUNT')}

  ($UserFlag  -BOR 0x2000)  {[void]$List.Add('SERVER_TRUST_ACCOUNT')}

  ($UserFlag  -BOR 0x10000)  {[void]$List.Add('DONT_EXPIRE_PASSWORD')}

  ($UserFlag  -BOR 0x20000)  {[void]$List.Add('MNS_LOGON_ACCOUNT')}

  ($UserFlag  -BOR 0x40000)  {[void]$List.Add('SMARTCARD_REQUIRED')}

  ($UserFlag  -BOR 0x80000)  {[void]$List.Add('TRUSTED_FOR_DELEGATION')}

  ($UserFlag  -BOR 0x100000)  {[void]$List.Add('NOT_DELEGATED')}

  ($UserFlag  -BOR 0x200000)  {[void]$List.Add('USE_DES_KEY_ONLY')}

  ($UserFlag  -BOR 0x400000)  {[void]$List.Add('DONT_REQ_PREAUTH')}

  ($UserFlag  -BOR 0x800000)  {[void]$List.Add('PASSWORD_EXPIRED')}

  ($UserFlag  -BOR 0x1000000)  {[void]$List.Add('TRUSTED_TO_AUTH_FOR_DELEGATION')}

  ($UserFlag  -BOR 0x04000000)  {[void]$List.Add('PARTIAL_SECRETS_ACCOUNT')}

  }

  $List -join ', '

} 

Foreach ( $info in $adsi)
{
Foreach ($val in $info)
  {
  $lastLogonDetails = $val | select-object name,lastlogin,UserFlags 
  $d = New-Object 'system.collections.generic.dictionary[string,string]'
  $d.Add("user",$lastLogonDetails.name)
  $d.Add("Time", $lastLogonDetails.lastlogin)
  $AccountType = Convert-UserFlag -UserFlag $lastLogonDetails.UserFlags.Value
  $d.Add("AccountType",$AccountType)
  $login += $d | ConvertTo-Json
  }
}
return $login
}
########## System Information  ###################
$computerSystem = Get-CimInstance CIM_ComputerSystem
$computerBIOS = Get-CimInstance CIM_BIOSElement
$computerOS = Get-CimInstance CIM_OperatingSystem
$computerCPU = Get-CimInstance CIM_Processor
$computerHDD = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID = 'C:'"

####################################################


################# AntiVirus Info #######################
function AntivirusInfo()
{
$At = @() 
$AntiVirus = Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct
Foreach( $AntiVirusProduct in $AntiVirus)
{
$ht = @{}
switch ($AntiVirusProduct.productState) { 
"262144" {$defstatus = "Up to date" ;$rtstatus = "Disabled"} 
    "262160" {$defstatus = "Out of date" ;$rtstatus = "Disabled"} 
    "266240" {$defstatus = "Up to date" ;$rtstatus = "Enabled"} 
    "266256" {$defstatus = "Out of date" ;$rtstatus = "Enabled"} 
    "393216" {$defstatus = "Up to date" ;$rtstatus = "Disabled"} 
    "393232" {$defstatus = "Out of date" ;$rtstatus = "Disabled"} 
    "393488" {$defstatus = "Out of date" ;$rtstatus = "Disabled"} 
    "397312" {$defstatus = "Up to date" ;$rtstatus = "Enabled"} 
    "397328" {$defstatus = "Out of date" ;$rtstatus = "Enabled"} 
    "397584" {$defstatus = "Out of date" ;$rtstatus = "Enabled"} 
default {$defstatus = "Unknown" ;$rtstatus = "Unknown"} 
    }
$ht.'Antivirus' = $AntiVirusProduct.displayName 
$ht.'Product GUID' = $AntiVirusProduct.instanceGuid 
$ht.'Product Executable' = $AntiVirusProduct.pathToSignedProductExe 
$ht.'Reporting Exe' = $AntiVirusProduct.pathToSignedReportingExe 
$ht.'DefinitionStatus' = $defstatus 
$ht.'RealtimeProtectionStatus' = $rtstatus
$At += $ht
}
return $At
}
################# End of AntiVirus Info ######################

################## Installed Updates #########################
function InstaledUpdatesInfo()
{
$installUpdates = @()
$Installed = Get-HotFix | Select-Object Description,HotFixId,InstalledBy,Installedon
foreach($install in $Installed)
{
$inst = @{}
$inst.'Description' = $install.Description
$inst.'HotFixId' = $install.HotFixId
$inst.'InstalledBy'= $install.InstalledBy
$inst.'InstalledOn' = $install.InstalledOn
$installUpdates += $inst
}
return $installUpdates 
}
###############################################################

############## Software List ##################################
function SoftwareList()
{
$softwareList = @()
$softwares = Get-WmiObject -Class Win32_Product | Select-Object IdentifyingNumber,Name,Vendor,Caption
foreach($software in $softwares)
{
$soft = @{}
$software
$soft.'IdentifyingNumber' = $software.IdentifyingNumber
$soft.'Name' = $software.Name
$soft.'Vendor'= $software.Vendor
$soft.'Version' = $software.Version
$soft.'Caption' = $software.Caption
$softwareList += $soft
}
return $softwareList 
}
###############################################################




########## System Information  ###################
Clear-Host
$SystemInfo = @{}
$Softwares = SoftwareList
$AVInfo = AntivirusInfo
$LastLoginInfo = LastLoginInfo
$InstaledUpdatesInfo = InstaledUpdatesInfo
$computerSystem = Get-CimInstance CIM_ComputerSystem
$computerBIOS = Get-CimInstance CIM_BIOSElement
$computerOS = Get-CimInstance CIM_OperatingSystem
$computerCPU = Get-CimInstance CIM_Processor
$computerHDD = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID = 'C:'"
$version = (Get-WmiObject -Class Win32_OperatingSystem).version
$name = (Get-WmiObject -Class Win32_OperatingSystem).name
$csname = (Get-WmiObject -Class Win32_OperatingSystem).csname
$architecture = (Get-WmiObject -Class Win32_OperatingSystem).osarchitecture

$SystemInfo."Name" = $name
$SystemInfo."CsName" = $csname
$SystemInfo."Architecture" = $architecture
$SystemInfo."Version" = $version
$SystemInfo."Manufacturer" = $computerSystem.Manufacturer
$SystemInfo."Model" = $computerSystem.Model
$SystemInfo."Serial Number" = $computerBIOS.SerialNumber
$SystemInfo."CPU" = $computerCPU.Name
$SystemInfo."HDD Capacity"  = "{0:N2}" -f ($computerHDD.Size/1GB) + "GB"
$SystemInfo."HDD Space" = "{0:P2}" -f ($computerHDD.FreeSpace/$computerHDD.Size) + " Free (" + "{0:N2}" -f ($computerHDD.FreeSpace/1GB) + "GB)"
$SystemInfo."RAM" = "{0:N2}" -f ($computerSystem.TotalPhysicalMemory/1GB) + "GB"
$SystemInfo."Operating System" = $computerOS.caption + ", Service Pack: " + $computerOS.ServicePackMajorVersion
$SystemInfo."User logged In" = $computerSystem.UserName
$SystemInfo."Last Reboot" = $computerOS.LastBootUpTime
$SystemInfo."Installed Software " = $Softwares
$SystemInfo."Last Login " = $LastLoginInfo
$SystemInfo."AntiVirus " = $AVInfo
$SystemInfo."Installed Updates" = $InstaledUpdatesInfo
$ApiJson = $SystemInfo | ConvertTo-Json
$ApiJson