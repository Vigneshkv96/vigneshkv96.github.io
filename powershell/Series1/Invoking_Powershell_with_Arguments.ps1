$ParamList = @{

    Param1 = ‘kaliyum’

    Param2 = ‘Veetil’

}

$PowerShell = [powershell]::Create()

[void]$PowerShell.AddScript({

    Param ($Param1, $Param2)

    [pscustomobject]@{

        Param1 = $Param1

        Param2 = $Param2

    }

}).AddParameters($ParamList)
$PowerShell.Invoke()
$PowerShell.Dispose()
