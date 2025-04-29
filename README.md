# Mol Wise

Uma aplicação web moderna para cálculos e consultas em química, incluindo uma tabela periódica interativa e calculadora de massa molar.

## 🚀 Funcionalidades

### Tabela Periódica

- Visualização completa dos elementos químicos
- Layout responsivo com 3 níveis de detalhamento:
  - Tela grande: Exibe todas as informações (símbolo, nome, massa molar, número atômico)
  - Tela média: Mostra símbolo e número atômico
  - Tela pequena: Apresenta apenas o símbolo do elemento
- Scroll horizontal automático para telas menores
- Numeração de grupos centralizada

### Calculadora de Massa Molar

- Cálculo preciso de massa molar para compostos químicos
- Interface intuitiva com teclado virtual
- Validação de fórmulas químicas
- Exibição formatada de fórmulas com subíndices
- Tratamento de erros com mensagens em português

## 🛠️ Tecnologias

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- React Hooks

## 💻 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/mol-wise.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse `http://localhost:3000` no seu navegador

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- Desktop (>1280px): Visualização completa
- Tablet (1024px-1280px): Informações reduzidas
- Mobile (<1024px): Visualização simplificada com scroll horizontal

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [ ] Adicionar mais calculadoras químicas
- [ ] Implementar modo escuro
- [ ] Adicionar informações detalhadas dos elementos
- [ ] Suporte para múltiplos idiomas
- [ ] Adicionar animações e transições
