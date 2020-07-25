
<#
Author: VIGNESH.K.V.
Script: Get-AzurehtmlReport.ps1
Description: The script is intended to get the Azure account details,ResourceGroup details,Virtual Network details & virtual Machine details
Version: Version:1.0
#>

################ Style Tags for HTML Page ############

$head= @'
<style> 
h1 { color: blue}
body { font-family: Arial; } 
table { 
width: 100%; 
border-collapse: collapse; 
    } 
table, th, td { 
border: 1px solid Black; 
padding: 5px; 
    } 
th { 
text-align: left; 
background-color: LightBlue; 
    } 
tr:nth-child(even) { 
background-color: GainsBoro; 
    }
.header {
  padding: 2px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 20px;
} 
</style> 
'@ 

#########################################################################

######### Getting the Subscription Details For the Account Logged ###############

$content = @{}
$content['SubscriptioId'] = az account show --query id
$content['Subscription']  = az account show --query name
$content['Environment']   = az account show --query environmentName
$frag1 = $content | convertTo-html -Property Environment,Subscription,SubscriptioId -Fragment  -PreContent '<h2> Account Details </h2>'

#################################################################################

################## Getting Resource Group Details ###########

$frag2 = Get-AzResourceGroup | select-object ResourceGroupName,Location,ProvisioningState,ResourceId | ConvertTo-Html -Fragment -PreContent '<h2> Resource Group Information </h2>'

################################################################

################### Getting Network Details ##########################

$subnets = Get-AzureRmVirtualNetwork | Select-Object Name,ResourceGroupName,ProvisioningState,Location,Subnets,AddressSpace
$Netcontent = '<h2> Network Information </h2><table id ="Network"><tr><th>VnetName</th><th>ResourceGroupName</th><th>Location</th><th>ProvisioningState</th><th>AddressSpace</th><th>Subnet</th></tr>'
foreach ($val in $subnets)
{
$network = $null
$frag3 = $null
$network += '<tr><td>'+$val.Name+'</td>'
$network += '<td>'+$val.ResourceGroupName+'</td>'
$network += '<td>'+$val.Location+'</td>'
$network += '<td>'+$val.ProvisioningState+'</td>'
$network += '<td>'+$val.AddressSpace.AddressPrefixes+'</td>'
$vnetTable = '<td><table id="vnet"><tr><th>Subnet Name</th><th>Address Space</th></tr>'
foreach ($subnet in $subnets)
{
$frag3 += '<tr><td>'+$subnet.Name+'</td>'
$frag3 +='<td>'+$subnet.AddressSpace.AddressPrefixes+'</td></tr>'
}
$vnetTable += $frag3+'</td></table>'
$network += $vnetTable
$NetContent += $network
}
$NetContent += '</table>'
#$NetContent

#########################################################################
############ Getting VM Details ##################

#Provide the subscription Id where the VMs reside
$subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

#Provide the name of the csv file to be exported
#$reportName = "myReport.csv"

#Select-AzSubscription $subscriptionId
$report = @()
$vms = Get-AzVM
$publicIps = Get-AzPublicIpAddress 
$nics = Get-AzNetworkInterface | ?{ $_.VirtualMachine -NE $null} 
foreach ($nic in $nics) { 
    $info = "" | Select VmName, ResourceGroupName, Region, VmSize, VirtualNetwork, Subnet, PrivateIpAddress, OsType, PublicIPAddress, NicName, ApplicationSecurityGroup 
    $vm = $vms | ? -Property Id -eq $nic.VirtualMachine.id 
    foreach($publicIp in $publicIps) { 
        if($nic.IpConfigurations.id -eq $publicIp.ipconfiguration.Id) {
            $info.PublicIPAddress = $publicIp.ipaddress
            } 
        } 
        $info.OsType = $vm.StorageProfile.OsDisk.OsType 
        $info.VMName = $vm.Name 
        $info.ResourceGroupName = $vm.ResourceGroupName 
        $info.Region = $vm.Location 
        $info.VmSize = $vm.HardwareProfile.VmSize
        $info.VirtualNetwork = $nic.IpConfigurations.subnet.Id.Split("/")[-3] 
        $info.Subnet = $nic.IpConfigurations.subnet.Id.Split("/")[-1] 
        $info.PrivateIpAddress = $nic.IpConfigurations.PrivateIpAddress 
        $info.NicName = $nic.Name 
        $info.ApplicationSecurityGroup = $nic.IpConfigurations.ApplicationSecurityGroups.Id 
        $report+=$info 
    } 
$report = $report | convertTo-html -Fragment -Precontent '<h2> Virtual Machine Details </h2>'

######################################################################333

########## Combining all the html Parts #################

$frag4 = $frag1+$frag2+$NetContent+$report
$html = ConvertTo-html -head $head -Precontent '<div class="header"><h1>Azure Html Report</h1></div>' -Postcontent $frag4

#########################################################

#### Transferring the Contents to Report.html #############

$html | Out-File .\Report.html

###########################################################
