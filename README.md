# TestingProject

## Install gcloud CLI (Ubuntu)
1. Update apt and install prerequisites:
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates gnupg curl
```
1. Add the Google Cloud apt repository and key:
```
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
```
1. Install the CLI and verify:
```
sudo apt-get update
sudo apt-get install -y google-cloud-cli
gcloud --version
```
