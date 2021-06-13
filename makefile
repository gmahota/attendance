mysql:
	mysql -u root -pAgnes270115! -P3312
	mysqldump -u [username] –p[password] [database_name] > [dump_file.sql]
backend:
  cd backend
  npm i
  npm run build
  cd ..
web:
  cd web
  npm i
  npm run build
  cd ..