# Application for sharing recepies with option of selling yours and communication between users
For this project I'm using:
* Docker
* Kubernetes(Minikube)
* Typescript
* React - with Redux
* Express
* Nats Streaming Service
* Redis
* SMTP2GO
---
## To Start App

You will need to get free [SMTP2GO](https://www.smtp2go.com/) account and put your API key into /infra/k8s/auth-depl.yaml 
```
minikube start 
minikube addons enable ingress
minikube ip 
sudo nano etc/hosts 
```
put ip from previos step as 

recepies.dev  ip

```
skaffold dev
```

---
### NOTES
* Browser will say that website is not secured, to solve this simply type in the browser:
``` 
thisisunsafe
```
* To get into shell of running pod:
``` 
kubectl get pods
kubectl exec --stdin --tty POD_NAME -- /bin/bash
```

* To Create Migration 
```
npm run typeorm:cli -- migration:create -n MigrationName
```