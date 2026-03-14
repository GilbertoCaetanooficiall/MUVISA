$urls = @{
    "login" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzc1OWY4MzgxYjNmYzRkMjg5ZmNiYWQ5OTRmMWM3MjlhEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
    "cadastro_1" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzA4Yjc4MTAxMTZiNjRhMTM5Mjg0MzQ5Y2VjMjVmMjNmEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
    "cadastro_2" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhjYTBiNzllYzAxYjQyOThiODk0MmJmN2Y0ODA5MDBlEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
    "cadastro_seguranca" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzExY2EwODMwZjNmMzQ4ZTk4MzU0ZWFkYzI5N2YwODJiEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
    "cadastro_3" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzA0NzQyY2YwNjRjNDRlNmViOGQzMTA0NmE3Y2E3YWVlEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
    "boas_vindas" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdmYzI1NjRmNzBhNjQ0OTQ4ODk5MWZlNzI3NTE3NWJmEgsSBxCX2uyzlRoYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjIyMjEyODk1MzYyNDkyNTIwMA&filename=&opi=89354086"
}

New-Item -ItemType Directory -Force -Path "C:\Users\PAT\MUVISA\tmp_screens"

foreach ($key in $urls.Keys) {
    $url = $urls[$key]
    $outFile = "C:\Users\PAT\MUVISA\tmp_screens\$key.html"
    Invoke-WebRequest -Uri $url -OutFile $outFile
    Write-Host "Downloaded $key to $outFile"
}
