const fs = require('fs');
const path = require('path');

// Configurações
const ICONS_SOURCE_DIR = 'F:/Downloads/Hero Icons _ Avatars - Rivalskins.com'; // Pasta onde os ícones estão atualmente
const HEROES_IMAGES_DIR = 'D:/Game design/Marvel-Rivals-Patch/Website/marvel-rivals-site/src/assets/images/heroes'; // Pasta de destino

// Mapeamento de nomes de ícone para pastas (casos especiais)
const iconToFolderMap = {
    "jeff-the-land-shark": "jeff",
    "cloak-and-dagger": "cloakdagger",
    "scarlet-witch": "witch",
    "peni-parker": "peni",
    "rocket-raccoon": "rocket",
    "the-thing": "thing",
    "doctor-strange": "strange",
    "iron-man": "ironman",
    "black-panther": "panther",
    "luna-snow": "luna",
    "winter-soldier": "wintersoldier",
    "mister-fantastic": "misterfantastic",
    "human-torch": "humantorch",
    "emma-frost": "emmafrost",
    "adam-warlock": "adamwarlock",
    "invisible-woman": "invisiblewoman",
    "squirrel-girl": "squirrelgirl",
    "iron-fist": "ironfist",
    "black-widow": "blackwidow",
    "star-lord": "starlord",
    "moon-knight": "moonknight",
    "the-punisher": "punisher",
    "spider-man": "spiderman",
    "captain-america": "captainamerica"
};

// Processa todos os arquivos *_avatar.png
fs.readdir(ICONS_SOURCE_DIR, (err, files) => {
    if (err) {
        console.error('❌ Erro ao ler a pasta de ícones:', err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith('_avatar.png')) {
            // Extrai o nome do herói do arquivo (ex: "jeff-the-land-shark_avatar.png" → "jeff-the-land-shark")
            const iconName = file.replace('_avatar.png', '');
            const folderName = iconToFolderMap[iconName] || iconName.split('-')[0]; // Usa o mapa ou o primeiro termo (ex: "hulk")

            const sourcePath = path.join(ICONS_SOURCE_DIR, file);
            const destDir = path.join(HEROES_IMAGES_DIR, folderName);
            const destPath = path.join(destDir, 'icon.png');

            // Cria a pasta do herói (se não existir)
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
                console.log(`📂 Pasta criada: ${destDir}`);
            }

            // Copia e renomeia o arquivo
            fs.copyFile(sourcePath, destPath, (err) => {
                if (err) {
                    console.error(`❌ Erro ao copiar ${file}:`, err);
                } else {
                    console.log(`✅ Ícone movido/renomeado: ${file} → ${folderName}/icon.png`);
                }
            });
        }
    });
});