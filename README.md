# Mol Wise

Uma aplicação web moderna para cálculos e consultas em química, incluindo uma tabela periódica interativa e **múltiplas calculadoras químicas instanciáveis**.

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

### 🆕 Página de Calculadoras (Multi-instância)

- **Abra múltiplas instâncias** da calculadora de massa molar ao mesmo tempo na página `/calculators`
- Menu lateral moderno com submenu dropdown flutuante e destaque visual
- Gerenciamento global das instâncias das calculadoras (abrir, fechar, múltiplas ao mesmo tempo)
- Estrutura pronta para adição de novas calculadoras químicas, como concentração, diluição, estequiometria, etc.
- Layout responsivo, consistente em todos os temas (claro e escuro)

## 🛠️ Tecnologias

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- React Hooks
- Context API
- Framer Motion (animações do menu/submenu)
- [shadcn/ui](https://ui.shadcn.com/) (ScrollArea e outros utilitários de UI)

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

## 🎨 Modo Escuro

- Interface adaptada para dark mode, incluindo menu lateral, caixas de diálogo e dropdowns.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [x] Permitir múltiplas instâncias da calculadora de massa molar (Multi-instância)
- [x] Implementar modo escuro
- [x] Menu lateral com submenu dropdown flutuante
- [ ] Adicionar mais calculadoras químicas (concentração, diluição, etc.)
- [ ] Adicionar informações detalhadas dos elementos
- [ ] Suporte para múltiplos idiomas
- [ ] Adicionar animações e transições em mais componentes
- [ ] Melhorar acessibilidade

---

**Sinta-se à vontade para sugerir melhorias ou contribuir!**
