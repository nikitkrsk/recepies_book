This website is using minikube and skaffold 


minikube start 
minikube addons enable ingress
minikube ip 
sudo nano etc/hosts 
put ip from previos step as 
recepies.dev  ip

skaffold dev





get into shell of running container 
kubectl exec --stdin --tty POD_NAME -- /bin/bash