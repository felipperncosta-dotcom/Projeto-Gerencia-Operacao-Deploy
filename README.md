# OperaBoard

Painel de tarefas operacionais com cadastro, alteração de status, busca e filtros. Dados persistidos no navegador (localStorage), sem servidor ou conta.

## Executar

Requer Node.js 22 ou superior. Sem dependências externas.

```sh
npm ci
npm test
npm run build
npm start
```

Abra http://localhost:3000. Para encerrar, Ctrl+C. O build gera `dist/`, que pode ser servido por qualquer hospedagem estática. Dados são locais a cada navegador/origem; não há sincronização entre usuários.

## Estrutura

- `src/`: interface e regras de negócio.
- `tests/`: testes automatizados de funcionalidades.
- `scripts/`: build e servidor local.
- `.github/workflows/ci.yml`: testes e entrega de artefato, condicionada ao sucesso.
- `docs/`: relatório e evidências.

## Controle de versão e entrega

Repositório: https://github.com/felipperncosta-dotcom/Projeto-Gerencia-Operacao-Deploy

O job `entrega` depende de `testes`. Um teste com falha impede a criação do pacote de entrega. Em execuções aprovadas, baixe o artefato `operaboard-site` na aba Actions e sirva seu conteúdo como site estático. Esta entrega por artefato não cria automaticamente um endereço público.

O roteiro reproduzível está em `docs/ROTEIRO.md`. O relatório distingue resultados locais de execuções remotas verificadas.
