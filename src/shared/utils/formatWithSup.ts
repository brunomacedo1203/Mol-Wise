export function formatWithSup(config: string): string {
    const maxElectrons: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
  
    // Função para converter número para tag <sup>
    const toSuperscript = (num: string): string => `<sup>${num}</sup>`;
  
    // Extrai o gás nobre, se houver
    let nobleGas = '';
    let rest = config;
    const nobleGasMatch = config.match(/^\s*(\[[A-Za-z]{1,2}\])/);
    if (nobleGasMatch) {
      nobleGas = nobleGasMatch[1];
      rest = config.replace(nobleGas, '');
    }
    rest = rest.trim();
  
    // Separa todos os subníveis corretamente, mesmo quando colados
    const subnivelRegex = /\d+[spdf]\d{1,2}(?=\d+[spdf]|$)/g;
    const subniveis = rest.match(subnivelRegex) || [];
  
    // LOGS PARA DEBUG
    console.log('CONFIG ENTRADA:', config);
    console.log('RESTANTE:', rest);
    console.log('SUBNÍVEIS ENCONTRADOS:', subniveis);
  
    const formattedSubniveis = subniveis.map((sub) => {
      const match = sub.match(/(\d+)([spdf])(\d{1,2})/);
      if (match) {
        const [, camada, subnivel, eletrons] = match;
        const eNum = parseInt(eletrons, 10);
        const max = maxElectrons[subnivel];
        if (eNum > max) {
          console.warn(`Subnível ${subnivel} não pode ter mais que ${max} elétrons. Encontrado: ${eNum}`);
        }
        return `${camada}${subnivel}${toSuperscript(eletrons)}`;
      }
      return sub;
    });
  
    // Junta tudo
    return [nobleGas, ...formattedSubniveis].filter(Boolean).join(' ').trim();
  }
  