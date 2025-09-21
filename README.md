# n8n Random Node

Custom node para [n8n](https://n8n.io/) que utiliza a API do [Random.org](https://www.random.org/) para gerar números randômicos reais.

O node se chama **Random** e expõe a operação **True Random Number Generator**, com dois parâmetros:
- **Min** → valor mínimo
- **Max** → valor máximo

# Pré-requisitos

- Docker e Docker Compose instalados
- Node.js >= 20

# Instalação e uso

Clone este repositório:

``` bash
git clone https://github.com/IgorFalco/n8n-random-node.git
cd n8n-random-node
```

1. Instale as depêndencias e faça o build do projeto

``` bash
npm install
npm run build
```

2. Subir n8n + Postgres com Docker

``` bash
docker compose up -d
```

Isso vai subir:

- `postgres` → banco de dados para armazenar workflows

- `n8n` → instância web do n8n com o Random Node disponível

Acesse em http://localhost:5678.

Após cadastrar um usuários:

1. Clique em Create Workflow

2. Adiciona o primeiro step e busque por `Random` e o adicione ao projeto.

3. Escolha os valores Min e Max em que o número deva ser gerado

4. Execute o step.

# Usar o workflow de exemplo (opcional)

Na pasta [workflows/](./workflows) existe um JSON de workflow pronto.
Você pode importá-lo na UI do n8n:

1. Abra o n8n em http://localhost:5678

2. Clique em Create Workflow

3. Nos `...` selecione `Import from File...`

4. Selecione o arquivo `Random_Node.json`

O workflow vai aparecer no editor já usando o node Random.

# 📂 Estrutura do Projeto

Baseado no template oficial [n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter).

```
├── n8n-random-node/ # Código do custom node (TypeScript + SVG)
│ ├── nodes/Random/ # Implementação do node
│ ├── dist/ # Build gerado (npm run build)
│ └── gulpfile.js # Script para copiar ícones
│
├── workflows/ # Workflows de exemplo em JSON
├── docker-compose.yml # Sobe n8n + Postgres
└── README.md # Documentação do projeto
```