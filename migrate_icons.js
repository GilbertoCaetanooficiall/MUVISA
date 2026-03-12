const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

const ICON_MAP = {
    'account_balance': 'Landmark',
    'add': 'Plus',
    'arrow_downward': 'ArrowDown',
    'arrow_forward': 'ArrowRight',
    'assignment': 'ClipboardList',
    'attach_file': 'Paperclip',
    'badge': 'Badge',
    'calendar_month': 'CalendarDays',
    'call': 'Phone',
    'chat': 'MessageCircle',
    'check': 'Check',
    'check_circle': 'CheckCircle',
    'checklist': 'ListChecks',
    'close': 'X',
    'delete': 'Trash2',
    'description': 'FileText',
    'domain': 'Building2',
    'download': 'Download',
    'error': 'AlertCircle',
    'filter_list': 'Filter',
    'flight_takeoff': 'PlaneTakeoff',
    'folder_managed': 'FolderSync',
    'groups': 'Users',
    'handshake': 'Handshake',
    'help_outline': 'HelpCircle',
    'hotel_class': 'Star',
    'hourglass_top': 'Hourglass',
    'lightbulb': 'Lightbulb',
    'location_city': 'Building',
    'location_on': 'MapPin',
    'lock': 'Lock',
    'logout': 'LogOut',
    'luggage': 'BaggageClaim',
    'mail': 'Mail',
    'menu': 'Menu',
    'menu_book': 'BookOpen',
    'notifications': 'Bell',
    'open_in_new': 'ExternalLink',
    'radio_button_unchecked': 'Circle',
    'receipt': 'Receipt',
    'request_quote': 'FileSignature',
    'schedule': 'Clock',
    'school': 'GraduationCap',
    'search': 'Search',
    'send': 'Send',
    'settings': 'Settings',
    'support_agent': 'Headset',
    'timeline': 'TrendingUp',
    'upload': 'Upload',
    'verified': 'BadgeCheck',
    'verified_user': 'ShieldCheck',
    'visibility': 'Eye',
    'work': 'Briefcase',
    'folder_open': 'FolderOpen',
    'credit_card': 'CreditCard'
};

function getIconName(matName) {
    if (matName.includes("isMenuOpen ?")) {
        return "{isMenuOpen ? <X className={className} /> : <Menu className={className} />}";
    }
    if (ICON_MAP[matName]) return ICON_MAP[matName];

    return matName.split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    const regex = /<span[^>]*className=["']([^"']*)material-(symbols-outlined|icons)([^"']*)["'][^>]*>(.*?)<\/span>/gs;

    let matches = [...content.matchAll(regex)];
    if (matches.length === 0) return false;

    let iconsToImport = new Set();
    let newContent = content;

    // Process backwards to preserve indices
    for (let i = matches.length - 1; i >= 0; i--) {
        let matchStr = matches[i][0];
        let classBefore = matches[i][1];
        let classAfter = matches[i][3];
        let iconName = matches[i][4].trim();
        let startIndex = matches[i].index;
        let endIndex = startIndex + matchStr.length;

        let classes = `${classBefore} ${classAfter}`.trim();
        classes = classes.replace(/\s+/g, ' ').replace('filled', '').trim();
        let classProp = classes ? ` className="${classes}"` : '';

        if (iconName.includes("{") && iconName.includes("}")) {
            if (iconName.includes("isMenuOpen")) {
                let lucideStr = `{isMenuOpen ? <X${classProp} /> : <Menu${classProp} />}`;
                iconsToImport.add('X');
                iconsToImport.add('Menu');
                newContent = newContent.slice(0, startIndex) + lucideStr + newContent.slice(endIndex);
            }
            continue;
        } else {
            let lucideName = getIconName(iconName);
            iconsToImport.add(lucideName);
            let replacement = `<${lucideName}${classProp} />`;
            newContent = newContent.slice(0, startIndex) + replacement + newContent.slice(endIndex);
        }
    }

    if (newContent !== content && iconsToImport.size > 0) {
        let importStmt = `import { ${Array.from(iconsToImport).sort().join(', ')} } from 'lucide-react';\n`;

        let importMatches = [...newContent.matchAll(/^import .*?;?\n/gm)];
        if (importMatches.length > 0) {
            let lastMatch = importMatches[importMatches.length - 1];
            let insertPos = lastMatch.index + lastMatch[0].length;
            newContent = newContent.slice(0, insertPos) + importStmt + newContent.slice(insertPos);
        } else {
            if (newContent.includes('"use client"')) {
                newContent = newContent.replace('"use client";', '"use client";\n' + importStmt);
                newContent = newContent.replace("'use client';", "'use client';\n" + importStmt);
            } else {
                newContent = importStmt + newContent;
            }
        }

        fs.writeFileSync(filepath, newContent, 'utf8');
        return true;
    }
    return false;
}

function processDirectory(dir, modifiedFiles = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath, modifiedFiles);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            try {
                if (processFile(fullPath)) {
                    modifiedFiles.push(fullPath);
                }
            } catch (e) {
                console.error(`Error processing ${fullPath}:`, e.message);
            }
        }
    }

    return modifiedFiles;
}

const modified = processDirectory(SRC_DIR);
console.log(`Modified ${modified.length} files:`);
modified.forEach(f => console.log(`  - ${f}`));
