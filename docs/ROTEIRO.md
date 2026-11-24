# Roteiro de demonstração e entrega

Equipe: Felippe Rodrigues Nascimento Costa e Bruno Henrique Chagas Piovan.

## Demonstrar a aplicação

1. Execute `npm ci`, `npm test` e `npm start` com Node.js 22+.
2. Abra http://localhost:3000 e cadastre uma tarefa com título, responsável e prioridade.
3. Verifique o status inicial Pendente, mude para Em andamento e depois Concluída.
4. Recarregue a página para demonstrar persistência.
5. Busque por responsável e combine os filtros de status e prioridade.

## Evidências reais de CI/CD em 24/11/2026

| Etapa | Commit | Execução | Resultado |
| --- | --- | --- | --- |
| Implementação | 5247099 | [45319319758](https://github.com/felipperncosta-dotcom/Projeto-Gerencia-Operacao-Deploy/actions/runs/45319319758) | Sucesso; artefato entregue |
| Regressão controlada | 012b3ae | [45319422159](https://github.com/felipperncosta-dotcom/Projeto-Gerencia-Operacao-Deploy/actions/runs/45319422159) | Testes falharam; entrega skipped; nenhum artefato |
| Correção por revert | 747524f | [45319496265](https://github.com/felipperncosta-dotcom/Projeto-Gerencia-Operacao-Deploy/actions/runs/45319496265) | Sucesso; artefato entregue |

A regressão alterou o status inicial para Concluída. Os testes existentes permaneceram intactos. A correção restaurou Pendente com `git revert`, preservando o histórico. Os JSONs em `evidencias/` foram obtidos da API pública do GitHub e contêm status dos jobs, passos e artefatos. Os arquivos TAP documentam as execuções locais com falha e após correção.

## Branch e integração

Desenvolvimento em `feature/operaboard`, integração em `main` com merge explícito (`--no-ff`). Consulte `git log --graph --oneline --all` e `evidencias/historico-git.txt`. A integração não depende de pull request: a API da integração recusou sua criação com HTTP 403; o merge pelo Git mantém dois pais e comprova a integração.

## Entrega

Na aba Actions, abra uma execução aprovada e baixe `operaboard-site` (requer sessão GitHub). O pacote contém index.html, style.css, app.js e domain.js. Pode ser publicado em hospedagem estática. Não foi configurada URL de produção: a entrega contínua deste projeto é o artefato validado. O bloqueio se aplica ao job de entrega, não constitui uma regra de proteção de branch.

Os artefatos expiram após 90 dias; o código, os JSONs, os resultados locais e o relatório ficam versionados. Para reproduzir a falha sem afetar main, crie uma nova branch `demo/reproducao` e aplique a alteração do commit 012b3ae; publique, aguarde a falha, reverta e publique novamente.

## Checklist do integrante responsável pela submissão

- Entregar o link do repositório e `docs/relatorio-tecnico.pdf`.
- Conferir nomes da equipe e acrescentar turma/disciplina se exigidas pela instituição.
- Apresentar as três execuções acima, o job skipped e o histórico de merge.
- Não enviar apenas o PDF: incluir o repositório com código, testes e pipeline.
