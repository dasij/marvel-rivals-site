const fs = require('fs');
const path = require('path');

// Caminhos base
const basePaths = [
    'D:/Game design/Marvel-Rivals-Patch/Website/marvel-rivals-site/src/assets/images/heroes',
    'D:/Game design/Marvel-Rivals-Patch/Website/marvel-rivals-site/src/assets/data/heroes'
];

// Lista de heróis (extraída do JSON fornecido)
const heroes = [
    { folder: "peni" }, { folder: "hulk" }, { folder: "groot" }, { folder: "magneto" }, { folder: "thing" },
    { folder: "thor" }, { folder: "captainamerica" }, { folder: "venom" }, { folder: "emmafrost" }, { folder: "strange" },
    { folder: "loki" }, { folder: "rocket" }, { folder: "mantis" }, { folder: "adamwarlock" }, { folder: "jeff" },
    { folder: "cloakdagger" }, { folder: "invisiblewoman" }, { folder: "ultron" }, { folder: "ironman" }, { folder: "spiderman" },
    { folder: "panther" }, { folder: "witch" }, { folder: "punisher" }, { folder: "namor" }, { folder: "luna" },
    { folder: "magik" }, { folder: "starlord" }, { folder: "storm" }, { folder: "hela" }, { folder: "wintersoldier" },
    { folder: "psylocke" }, { folder: "moonknight" }, { folder: "hawkeye" }, { folder: "squirrelgirl" }, { folder: "ironfist" },
    { folder: "blackwidow" }, { folder: "wolverine" }, { folder: "misterfantastic" }, { folder: "humantorch" }
];

// Cria pastas e arquivos JSON para cada herói
heroes.forEach(hero => {
    const folderName = hero.folder;

    basePaths.forEach(basePath => {
        const heroPath = path.join(basePath, folderName);

        // Cria a pasta do herói (se não existir)
        if (!fs.existsSync(heroPath)) {
            fs.mkdirSync(heroPath, { recursive: true });
            console.log(`✅ Pasta criada: ${heroPath}`);
        } else {
            console.log(`ℹ️ Pasta já existe: ${heroPath}`);
        }

        // Se for a pasta "data/heroes", cria os arquivos JSON
        if (basePath.includes('data/heroes')) {
            const habilidadesPath = path.join(heroPath, `${folderName}_habilidades.json`);
            const teamupsPath = path.join(heroPath, `${folderName}_teamups.json`);

            // Cria habilidades.json (se não existir)
            if (!fs.existsSync(habilidadesPath)) {
                fs.writeFileSync(habilidadesPath, JSON.stringify({ habilidades: [] }, null, 2));
                console.log(`📄 Arquivo criado: ${habilidadesPath}`);
            }

            // Cria teamups.json (se não existir)
            if (!fs.existsSync(teamupsPath)) {
                fs.writeFileSync(teamupsPath, JSON.stringify({ teamups: [] }, null, 2));
                console.log(`📄 Arquivo criado: ${teamupsPath}`);
            }
        }
    });
});

console.log("✅ Todas as pastas e arquivos foram verificados/criados!");