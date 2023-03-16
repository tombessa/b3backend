
class ColumnType{
	[string]$name
}
class Column{
	[string]$name
	[string]$primitive
	[boolean]$required
	[boolean]$unique
	[ColumnType[]]$column_type
}
class Entity {
    [string]$name
	[Column[]]$column
}

echo ******************************************************* "*** Create new Files For Entity***" ******************************************************* 
#$entity = [Entity]::new()
#$entity.name = Read-Host -Prompt 'Entity Name'

$functions = "Create", "List", "Update", "Delete"
$actions =  "create", "findMany", "update", "delete"
$from_params =  "body", "query", "body", "query"
$url_action =  "post", "get", "patch", "delete"

$diretorio_atual=(Get-Item .).FullName
$TemplateParameterFileLocal="$diretorio_atual\entity.JSON"
$entity = Get-Content $TemplateParameterFileLocal | Out-String | ConvertFrom-Json

Get-ChildItem -Path "$diretorio_atual" -Include "routes.ts" -File -Recurse | foreach { $_.Delete()}
Copy-Item -Path "$diretorio_atual\_routes.template" -Destination "$diretorio_atual\routes.ts" -Recurse
Set-Location "$diretorio_atual"

$enum_list=""
$router="`n"
$import_router=""
foreach ($item_entity in $entity) {
	$required_code=""
	$interface_column=""
	$required_code=""
	$column_init=""
	$unique_list_column=""
	$columns_list=""
	$controller_param=""
	$role_list=""
	$controller_list=""
	$where=""
	$data=""
	$import_role=""
	$entity_name=$item_entity.name
	$entity_prisma=$entity_name.substring(0,1).tolower()+$entity_name.substring(1)
	foreach ($item_column in $item_entity.column) {
		$list_enum_1=""
		$list_enum_2=""		
		$column_name = $item_column.name
		$column_primitive = $item_column.primitive
		$column_required = $item_column.required
		$column_unique = $item_column.unique
		
		if($column_required){
			$required_code += "	if(! ${column_name} ){      throw new Error(""'${column_name}' Required"")    } `n"
			
			$interface_column +=  "	${column_name} : ${column_primitive}; `n"
		}else{
			$interface_column +=  "	${column_name}? : ${column_primitive}; `n"
		}
		
		if($column_unique){			
			$unique_list_column += "	${column_name} : ${column_name}, `n"
		}
		
		$auto_column = !(($column_name -eq "created_by") -or ($column_name -eq "updated_by"))
		if($auto_column){
			$columns_list +=  $column_name + " ,"
		}
		
		$column_init += "	${column_name} : undefined, `n"
		
		$controller_param +=  "	"+$column_name + ", `n"
		
		$is_enum = ($column_primitive -like "*Enum*")
		if ($is_enum) {
			$role_list +=  $column_primitive + ","
			foreach ($item_type in $item_column.column_type) {
				$enum_item = $item_type.name
				$list_enum_1 += "	$enum_item : '$enum_item' `n"
				$list_enum_2 += "	$enum_item : '$enum_item', `n"
			}
			$enum_list += "
export const ${column_primitive} : {
	${list_enum_1}
}= {
	${list_enum_2}
}
export type ${column_primitive} = typeof ${column_primitive}[keyof typeof ${column_primitive}]; `n"
			
			$controller_list += "	${column_name} :  ${column_primitive} [${column_name}], `n"
		}else{
			$controller_list += "	${column_name} :  ${column_name}, `n"			
		}
		if($column_primitive -eq "number"){
			$where += "	if(${column_name} !== undefined) query.where = {...query.where, ${column_name} : Number(${column_name})}; `n"
			$data +=  "	if(${column_name} !== undefined) query.data = {...query.data, ${column_name} : Number(${column_name})}; `n"
		}else{
			$where += "	if(${column_name} !== undefined) query.where = {...query.where, ${column_name} : ${column_name}}; `n"
			$data +=  "	if(${column_name} !== undefined) query.data = {...query.data, ${column_name} : ${column_name}}; `n"
		}
	}
	$entity_lower = $entity_name.ToLower()
	if(!($unique_list_column -eq "")){
		$unique_code = "
	const unique = await prismaClient.${entity_prisma}.findFirst({
	  where:{
		#id_check#
		${unique_list_column}
	  }
	})
	if(unique){
	  throw new Error(""$entity_name already exists"")
	}";	
	}
	if(!($role_list -eq "")){
		$import_role='import {'+$role_list.Substring(0,$role_list.Length-1)+'} from "../../interface/enum";'
	}
	$columns_list = $columns_list.Substring(0,$columns_list.Length-1)
	
	$index = 0
	$diretorio_atual=(Get-Item .).FullName
	foreach ($function in $functions) {
		$from_param = $from_params[$index]
		if($from_param -eq "query"){
			$controller_request = "	const { $columns_list } = req.$from_param as unknown as ${entity_name}Request;"
			$interface_request = ", ${entity_name}Request"
		}else{
			$controller_request = "	const { $columns_list } = req.$from_param;"
			$interface_request = ""
		}
		$function_lower = $function.ToLower()
		
		Set-Location "$diretorio_atual"
		
		echo ******COPYING CONTROLLER******
		echo "=>import_role: $import_role"
		echo "=>function: $function"
		echo "=>entity_name: $entity_name"
		echo "=>entity_lower: $entity_lower"
		echo "=>columns_list: $columns_list"
		echo "=>controller_request: $controller_request"
		echo "=>function_lower: $function_lower"
		echo "=>controller_list: $controller_list"
		echo "=>interface_request: $interface_request"
		
		#copiando o arquivo controller
		$path="$diretorio_atual\controllers\$entity_lower"
		if (!(Test-Path -Path "$path")) { mkdir "$path"}
		$template_file="_controller.template"
		$index_file = $function+$entity_name+"Controller.ts"
		Get-ChildItem -Path "$path" -Include "$index_file" -File -Recurse | foreach { $_.Delete()}
		Copy-Item -Path "$diretorio_atual\$template_file" -Destination "$path" -Recurse
		
		Set-Location "$path"
		Get-ChildItem -File -Recurse | % { Rename-Item -Path $_.PSPath -NewName $_.Name.replace("$template_file","$index_file")}
		
		$addedFiles = Get-ChildItem . $index_file -rec
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#import_role#",$import_role }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#function#",$function }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#entity#",$entity_name }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#entity_lower#",$entity_lower }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#columns_list#",$columns_list }| Set-Content $file.PSPath}
		
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#controller_request#",$controller_request }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#function_lower#",$function_lower }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#controller_list#",$controller_list }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#interface_request#",$interface_request }| Set-Content $file.PSPath}
		
		
		Set-Location "$diretorio_atual"
		
		$init_query=""
		$id_check=""
		
		echo ******COPYING SERVICE******
		
		echo "=>entity_prisma: $entity_prisma"
		echo "=>import_role: $import_role"
		echo "=>entity_name: $entity_name"
		echo "=>entity_lower: $entity_lower"
		echo "=>function: $function"
		echo "=>interface_column: $interface_column"
		echo "=>controller_param: $controller_param"
		
		#copiando o arquivo controller
		$path="$diretorio_atual\services\$entity_lower"
		if (!(Test-Path -Path "$path")) { mkdir "$path"}
		$template_file="_service.template"
		$index_file = $function+$entity_name+"Service.ts"
		Get-ChildItem -Path "$path" -Include "$index_file" -File -Recurse | foreach { $_.Delete()}
		Copy-Item -Path "$diretorio_atual\$template_file" -Destination "$path" -Recurse
		
		Set-Location "$path"
		Get-ChildItem -File -Recurse | % { Rename-Item -Path $_.PSPath -NewName $_.Name.replace("$template_file","$index_file")}
		
		$addedFiles = Get-ChildItem . $index_file -rec
		
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#entity_prisma#",$entity_prisma }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#import_role#",$import_role }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#entity#",$entity_name }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#entity_lower#",$entity_lower }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#function#",$function }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#interface_column#",$interface_column }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#controller_param#",$controller_param }| Set-Content $file.PSPath}
		switch ( $function )
		{
			"Create" {
				echo "=>init_query: $init_query"
				echo "=>required_code: $required_code"
				echo "=>unique_code: $unique_code"
				echo "=>where: "
				
				$init_query="{data:{$column_init}}"
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#init_query#",$init_query }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#required_code#",$required_code }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#unique_code#",$unique_code }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#where#","" }| Set-Content $file.PSPath}
				}
			"Update" {
				echo "=>init_query: $init_query"
				echo "=>required_code: $required_code"
				echo "=>unique_code: $unique_code"
				
				$id_check=" NOT: {id: {equals: id,},},"
				$init_query="{where:{},data:{$column_init}}"
				$where="query.where = {...query.where, id : id};"
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#init_query#",$init_query }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#required_code#",$required_code }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#unique_code#",$unique_code }| Set-Content $file.PSPath}
			}
			"List" {
				echo "=>init_query: $init_query"
				echo "=>required_code: $required_code"
				echo "=>unique_code: $unique_code"
				echo "=>data: "
				
				$init_query="{where:{}}"
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#init_query#",$init_query }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#unique_code#","" }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#required_code#","" }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#data#","" }| Set-Content $file.PSPath}
			}
			"Delete" {
				echo "=>init_query: $init_query"
				echo "=>required_code: $required_code"
				echo "=>unique_code: $unique_code"
				echo "=>data: "
				
				$init_query="{where:{}}"
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#init_query#",$init_query }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#unique_code#","" }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#required_code#","" }| Set-Content $file.PSPath}
				foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#data#","" }| Set-Content $file.PSPath}
			}
		}
		echo "=>id_check: $id_check"
		echo "=>where: $where"
		echo "=>unique_code: $unique_code"
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#id_check#",$id_check }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#where#",$where }| Set-Content $file.PSPath}
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#data#",$data }| Set-Content $file.PSPath}
		
		$action=$actions[$index]
		echo "=>data: $action"
		foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#action#",$action }| Set-Content $file.PSPath}
		
		Set-Location "$diretorio_atual"
		
		$action_param=$url_action[$index]
		$import_router += "import {${function}${entity_name}Controller} from ""./controllers/$entity_lower/${function}${entity_name}Controller"";`n"
		$router += "router.${action_param}('/${entity_lower}', isAuthenticated, new ${function}${entity_name}Controller().handle)`n"
		
		$index+=1
	}
	$router += "`n"
}


if(!($enum_list -eq "")){
	echo ******COPYING ENUM******
	echo "=>enum_list: $enum_list"	
	
	$path="$diretorio_atual\interface"
	if (!(Test-Path -Path "$path")) { mkdir "$path"}
	$template_file="_enum.template"
	$index_file = "enum.ts"
	Get-ChildItem -Path "$path" -Include "$index_file" -File -Recurse | foreach { $_.Delete()}
	Copy-Item -Path "$diretorio_atual\$template_file" -Destination "$path" -Recurse
	
	Set-Location "$path"
	Get-ChildItem -File -Recurse | % { Rename-Item -Path $_.PSPath -NewName $_.Name.replace("$template_file","$index_file")}
	
	$addedFiles = Get-ChildItem . $index_file -rec
	foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#enum_list#",$enum_list }| Set-Content $file.PSPath}
}
Set-Location "$diretorio_atual"

if(!($enum_list -eq "")){
	echo ******COPYING ROUTE******
	echo "=>import_router: $import_router"	
	echo "=>router: $router"	

	$path="$diretorio_atual"
	if (!(Test-Path -Path "$path")) { mkdir "$path"}
	$template_file="_routes.template"
	$index_file = "routes.ts"
	
	Get-ChildItem -Path "$path" -Include "$index_file" -File -Recurse | foreach { $_.Delete()}
	Copy-Item -Path "$diretorio_atual\$template_file" -Destination "$path\$index_file"
	
	$addedFiles = Get-ChildItem . $index_file -rec
	foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#import_router#",$import_router }| Set-Content $file.PSPath}
	foreach ($file in $addedFiles){(Get-Content $file.PSPath) | Foreach-Object { $_ -replace "#router#",$router }| Set-Content $file.PSPath}
}
