$paths = @(
  "c:\Users\eliea\Documents\buisness\web design\clients webdesign\vm-producers\src\components",
  "c:\Users\eliea\Documents\buisness\web design\clients webdesign\vm-producers\src\index.css"
)
$results = Get-ChildItem -Path $paths[0] -Filter "*.tsx" -Recurse
$results += Get-Item $paths[1]
foreach ($f in $results) {
  $lines = Get-Content $f.FullName
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "hsl\(43|43 80%|43 72%|43 75%|43 90%") {
      Write-Host "$($f.Name):$($i+1): $($lines[$i].Trim())"
    }
  }
}
