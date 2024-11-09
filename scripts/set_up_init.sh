cd scripts

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "${GREEN} Setting up backend... ${NC}"
bash set_up_backend.sh
echo "${GREEN} Setup complete... ${NC}"


echo "${GREEN} Setting up database... ${NC}"
bash set_up_database.sh
echo "${GREEN} Setup complete... ${NC}"


echo "${GREEN} Setting up frontend... ${NC}"
bash set_up_frontend.sh
echo "${GREEN} Setup complete... ${NC}"