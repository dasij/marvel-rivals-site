const fs = require('fs');
const path = require('path');

// Configurações
const SOURCE_DIR = 'F:/Downloads/Lord Icons - Rivalskins.com'; // Pasta com os ícones
const OUTPUT_FILE = 'F:/Downloads/Lord Icons - Rivalskins.com/fileList.json'; // Arquivo de saída (será criado no mesmo diretório do script)

// Lê os arquivos da pasta
fs.readdir(SOURCE_DIR, (err, files) => {
    if (err) {
        console.error('❌ Erro ao ler a pasta:', err);
        return;
    }

    // Filtra apenas arquivos (ignora pastas)
    const fileList = files.filter(file => {
        return fs.statSync(path.join(SOURCE_DIR, file)).isFile();
    });

    // Salva a lista em um JSON
    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(fileList, null, 2), // Formatação legível
    );

    console.log(`✅ Lista salva em: ${path.resolve(OUTPUT_FILE)}`);
    console.log(`📄 Total de arquivos: ${fileList.length}`);
});