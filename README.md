# Trabajo Final Integrador ( Banco de Pruebas )
## Sistemas actuales de Intercambio de Información
### Autor: Gargantini Leandro

#Setup

1. Clonar repositorio
``` git clone https://github.com/lgargantini/tfiTest.git ```
2. Ingresar a carpeta
``` cd tfiTest ```
3. Instalar paquetes asociados al proyecto
``` npm install ```
( requiere node js + npm instalado en pc )

### Ubuntu
``` 
        sudo apt-get update
        sudo apt-get install nodejs
        sudo apt-get install npm
```

### OSx 
Seguir instrucciones en https://nodejs.org/

# Iniciar server

## Modo Developer
``` gulp develop ```

( requiere gulp instalado de modo global )

### Ubuntu / OSx
``` npm install -g gulp ```

## Modo Normal Nativo de Node ( via NPM )
``` npm start ```

# Iniciar cliente

1. Abrir Navegador de Elección ( Ej: Chrome, Firefox )
2. Ingresar a la url cliente http://localhost:5000 [Click Aqui](http://localhost:5000)
3. Se pueden correr los 3 test desarrollados bajo el siguiente esquema:

"http://localhost:5000/technology/testnumber"
## Ejemplos

* http://localhost:5000/http/test1
* http://localhost:5000/ws/test1

#Test Disponibles
* test1
* test2
* test3

#Tecnologias Disponibles
* http
* ws
  


