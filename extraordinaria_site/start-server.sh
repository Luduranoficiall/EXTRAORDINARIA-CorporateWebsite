#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║     🚀 EXTRAORDINÁRIA.AI - SERVIDOR CORPORATIVO                ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Diretório
SITE_DIR="/c/Users/User/OneDrive/Documentos/Extraordinaria.ai/extraordinaria_site"

echo -e "${YELLOW}📁 Navegando para diretório...${NC}"
cd "$SITE_DIR" || { echo -e "${RED}Erro: Diretório não encontrado!${NC}"; exit 1; }

echo -e "${GREEN}✅ Diretório carregado!${NC}"
echo ""

# Menu
echo -e "${CYAN}Escolha uma opção:${NC}"
echo ""
echo "1) Iniciar servidor HTTP (localhost:8000)"
echo "2) Iniciar com URL pública (localtunnel)"
echo "3) Verificar status"
echo "4) Parar todos os servidores"
echo ""
read -p "Opção: " choice

case $choice in
    1)
        echo -e "\n${CYAN}🚀 Iniciando servidor HTTP...${NC}\n"
        http-server -p 8000 --cors
        ;;
    2)
        echo -e "\n${CYAN}🌐 Iniciando com URL pública...${NC}\n"
        http-server -p 8000 --cors &
        sleep 2
        lt --port 8000 --subdomain extraordinaria
        ;;
    3)
        echo -e "\n${CYAN}📊 Verificando status...${NC}\n"
        echo -e "Servidor HTTP: $(netstat -tuln 2>/dev/null | grep ':8000' > /dev/null && echo -e '${GREEN}ATIVO ✅${NC}' || echo -e '${RED}INATIVO ❌${NC}')"
        ;;
    4)
        echo -e "\n${YELLOW}🛑 Parando servidores...${NC}\n"
        pkill -f "http-server"
        pkill -f "lt --port"
        echo -e "${GREEN}✅ Servidores parados!${NC}\n"
        ;;
    *)
        echo -e "${RED}Opção inválida!${NC}"
        ;;
esac
