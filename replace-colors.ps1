$root = "c:\Users\eliea\Documents\buisness\web design\clients webdesign\vm-producers\src"
$emDash = [char]0x2014
$files = Get-ChildItem -Path $root -Recurse -Include "*.tsx","*.ts","*.css"
foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  if ($content.Contains($emDash)) {
    $new = $content.Replace($emDash, "-")
    [System.IO.File]::WriteAllText($file.FullName, $new, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $($file.Name)"
  }
}
Write-Host "Done."
