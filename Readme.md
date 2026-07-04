# fc-ddd-patterns

## Instalação

```bash
npm install
```

## Rodando os testes

```bash
# Todos os testes
npm test

# Apenas domínio (sem precisar do SQLite)
npx jest src/domain

# Apenas os domain events do Customer
npx jest src/domain/customer/event
```
