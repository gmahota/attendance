run:
	##Criação de migracoes
	yarn typeorm migration:create -n create_paymentsMpesaLogs
	yarn typeorm migration:run 

	## Anular a migração
	yarn typeorm migration:revert

	#docker typeorm migration

	#docker
	docker run -it --init -p 8888:5000 biostar-api-container
	docker build -t biostar-api-container . && docker run -it --init -p 8888:5000 biostar-api-container -e dbType=mysql -e dbHost=uttn.cwsainxbbluf.us-west-2.rds.amazonaws.com -e dbPort=3306 -e dbUsername=gmahota -e dbPassword='Agnes270115!' -e dbDatabase='uttn_api_test'
	deno run --allow-read --allow-write --allow-net --allow-env --allow-plugin --unstable bin/server.ts
	docker build -t uttn-container . && docker run -it --init -p 8888:5000 uttn-container -e dbType=mysql -e dbHost=uttn.cwsainxbbluf.us-west-2.rds.amazonaws.com -e dbPort=3306 -e dbUsername=gmahota -e dbPassword='Agnes270115!' -e dbDatabase='uttn_api_test'