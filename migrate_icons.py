import os
import re

# Directory to scan
SRC_DIR = r"c:\Users\Gilberto Caetano\Downloads\stitch (2)\muvisa\src"

# Icon mapping
ICON_MAP = {
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
}

# Add some fallbacks just in case
def get_icon_name(mat_name):
    # Some dynamic ones
    if "isMenuOpen ?" in mat_name:
        return "{isMenuOpen ? <X className={className} /> : <Menu className={className} />}"
    if mat_name in ICON_MAP:
        return ICON_MAP[mat_name]
    
    # Capitalize and clean up
    parts = mat_name.split('_')
    return "".join(p.capitalize() for p in parts)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all usages: <span className="material-symbols-outlined ...">icon</span>
    # Or material-icons
    pattern = r'<span[^>]*className=["\']([^"\']*)material-(symbols-outlined|icons)([^"\']*)["\'][^>]*>(.*?)</span>'
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    if not matches:
        return False
        
    icons_to_import = set()
    new_content = content
    
    # Reverse so we don't mess up offsets
    for match in reversed(matches):
        full_match = match.group(0)
        class_before = match.group(1)
        class_after = match.group(3)
        icon_name = match.group(4).strip()
        
        # Determine the classes to keep, removing "material-symbols-outlined", "material-icons" and "filled"
        classes = f"{class_before} {class_after}".strip()
        classes = re.sub(r'\s+', ' ', classes).replace('filled', '').strip()
        
        # Replace text classes with icon sizing if possible, but user wants to preserve tailwind classes
        # Some icons might have `text-3xl` or `text-sm`, Lucide respects these on the SVG if passed as className, 
        # but typical usage is w-6 h-6. User requested: Use Tailwind utilities such as w-4 h-4, w-5 h-5, w-6 h-6.
        # But also: "You must preserve: Tailwind classes... Only the icon element itself should be replaced."
        # Passing existing className to the Lucide icon is the safest strict visual refactor!
        
        if "{" in icon_name and "}" in icon_name:
            # It's a dynamic icon like {link.icon} or {isMenuOpen ? 'close' : 'menu'}
            # This requires manual inspection or tricky rendering.
            # We'll handle `{isMenuOpen ? 'close' : 'menu'}` explicitly
            if "isMenuOpen" in icon_name:
                lucide_component = "{isMenuOpen ? <X" + (f' className="{classes}"' if classes else '') + " /> : <Menu" + (f' className="{classes}"' if classes else '') + " />}"
                icons_to_import.add('X')
                icons_to_import.add('Menu')
                new_content = new_content[:match.start()] + lucide_component + new_content[match.end():]
                continue
            else:
                # e.g {link.icon} or {stat.icon} etc.
                # If the variable maps to a component, we need to render the component.
                # E.g. <span className="..."> {link.icon} </span> -> {React.createElement(link.icon, {className: "..."})}
                # However, typically the parent definition contains the string. We will modify the parent object definition below.
                # For now, if we see `{link.icon}`, we can replace with `<link.icon className="..." />` assuming link.icon is a component
                # But it might be lowercase. Let's just create an inline dynamic tag or assume we will fix the data source.
                var_name = icon_name.strip("{} \t\r\n")
                if "." in var_name:
                    # like link.icon
                    # Assuming we pass the component itself, we can use a capitalized alias or just render it
                    # e.g. `<link.icon />` might not work if lowercase, JSX expects Capitalized.
                    # We can use `{const Icon = link.icon; return <Icon />}` but that's messy inline.
                    # Actually React allows `<Component>` if the variable is Capitalized. So it must be `link.icon` assuming it is a component.
                    # Wait, let's just use `{React.createElement(IconMapping[link.icon] || UserComponent)}` - too complex.
                    # Let's inspect these manually, write the script to skip dynamic `{ ... }` for now, except specific ones.
                    continue
        else:
            lucide_name = get_icon_name(icon_name)
            icons_to_import.add(lucide_name)
            
            # Reconstruct the tag
            class_prop = f' className="{classes}"' if classes else ''
            replacement = f"<{lucide_name}{class_prop} />"
            
            new_content = new_content[:match.start()] + replacement + new_content[match.end():]

    if new_content != content and icons_to_import:
        # Import injection
        import_stmt = f"import {{ {', '.join(sorted(icons_to_import))} }} from 'lucide-react';\n"
        
        # Find the last import
        import_matches = list(re.finditer(r'^import .*?;?\n', new_content, re.MULTILINE))
        if import_matches:
            last_import = import_matches[-1]
            new_content = new_content[:last_import.end()] + import_stmt + new_content[last_import.end():]
        else:
            # Find the top of the file after the "use client"
            if "use client" in new_content:
                new_content = new_content.replace('"use client";', '"use client";\n' + import_stmt, 1)
                new_content = new_content.replace("'use client';", "'use client';\n" + import_stmt, 1)
            else:
                new_content = import_stmt + new_content

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
        
    return False

def main():
    modified_files = []
    for root, _, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.tsx', '.jsx')):
                filepath = os.path.join(root, file)
                try:
                    if process_file(filepath):
                        modified_files.append(filepath)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")
                    
    print(f"Modified {len(modified_files)} files:")
    for f in modified_files:
        print(f"  - {f}")

if __name__ == "__main__":
    main()
