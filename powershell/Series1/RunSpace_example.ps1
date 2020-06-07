$Runspace = [runspacefactory]::CreateRunspace()

$PowerShell = [powershell]::Create()

$PowerShell.runspace = $Runspace

$Runspace.Open()

[void]$PowerShell.AddScript({

    Get-Date

    Start-Sleep -Seconds 10

})

$AsyncObject = $PowerShell.BeginInvoke()
$AsyncObject
$Data = $PowerShell.EndInvoke($AsyncObject)
$PowerShell.Dispose()


$AsyncObject

