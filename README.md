
# Projeto StreamPlay - AV2 Banco de Dados

## Cenario escolhido
Opcao A - Plataforma de Streaming e Entretenimento.

## Descricao
O StreamPlay e uma plataforma ficticia de streaming que permite cadastrar usuarios, armazenar filmes, series, musicas, avaliacoes, favoritos e historico de visualizacoes.

## Colecoes utilizadas
- Usuarios: armazena os dados dos usuarios, perfis, favoritos e historico.
- Midias: armazena filmes, series, musicas e documentarios.
- Avaliacoes: armazena notas e comentarios dos usuarios.

## Justificativa da escolha do MongoDB
O MongoDB foi escolhido porque trabalha com documentos JSON, permitindo armazenar informacoes de maneira flexivel. Em uma plataforma de streaming, filmes, series e musicas possuem caracteristicas diferentes, por isso nao precisam seguir exatamente a mesma estrutura.

Alem disso, o MongoDB permite utilizar arrays e documentos incorporados, facilitando o armazenamento de favoritos, perfis e historicos. Sua escalabilidade horizontal tambem permite aumentar a capacidade do sistema conforme a quantidade de usuarios cresce.

Por esses motivos, o modelo NoSQL e adequado para o StreamPlay.
