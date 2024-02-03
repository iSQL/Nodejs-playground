$rgName = "HairCutApp"
$servicePlan = "HairCutAppPlan"
$appName ="HairCutReservation"

#az group create --name $rgName --location "East US"
#az appservice plan create --name $servicePlan --resource-group $rgName --sku FREE
#az webapp create --resource-group $rgName  --plan $servicePlan --name $appName


#az webapp config appsettings list --name $appName --resource-group $rgName --query "[?name=='WEBSITE_NODE_DEFAULT_VERSION'].value"
