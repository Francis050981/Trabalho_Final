tart do Projeto
Uso do Git
**********************
Comandos GIT
Na pasta do projeto
> git init                          => Inicia o git na pasta
> git status                        => Mostra alterações antes de fazer o commit
> git add -A                        => Adiciona novos arquivos no monitor do GIT
> git commit -m "Comentario"        => Sobe os arquivos no GIT
> git commit -am "Comentario"       => Sobe os arquivos no GIT
> git log                           => Verifica as alterações
> git branch                        => Lista os branch's mostrando qual está
> git reset --soft (hash do commit) => Volta a versão até antes de fazer o commit, mantendo alter. (com add)
> git reset --mixed (hash do commit)=> Volta a versão até antes de fazer o commit, mantendo alter. (sem add)
> git reset --hard (hash do commit) => Elimina todas as alterações deste commit
> git branch (Nome_novo)            => Cria um novo branch
> git checkout (Nome_novo_Branch)   => Muda de Branch
> git diff                          => Mostra as alterações feitas dentro do arquivo
> git diff --name-only              => Mostra o nome dos arquivos alterados
> git diff (nome do arquivo)        => Mostra as alteraçõe em um arquivo específico
> git checkout HEAD -- (n. arquivo) => Volta a ultima alteração do aquivo específico
